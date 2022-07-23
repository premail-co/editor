import { Service } from "./Service";
import { IInjectable, Class } from "./types";
interface IInstanceManager<T extends Class<IInjectable>> {
  registerDefinitions(args: Array<{ id: Symbol; class: T }>): void;
  unregisterDefinitions(id: Array<Symbol>): void;
  injectInstance<S>(id: Symbol): S | null;
  dropInstances(): void;
  listInstanceIds(): Array<Symbol>;
  setInstanceManagementStrategy(strategy: IInstanceManagementStrategy<T>): void;
}

interface IInstanceManagementStrategy<T extends Class<IInjectable>> {
  onRegisterDefinitions(args: Array<{ id: Symbol; class: T }>): void;
  onUnregisterDefinitions(id: Array<Symbol>): void;
  onInjectInstance(id: Symbol): InstanceType<T> | null;
  onDropInstances(): void;
  onListInstanceIds(): Array<Symbol>;
  onStrategyChange(): void;
}

class SimpleInstanceManagementStrategy
  implements IInstanceManagementStrategy<Class<IInjectable, any>>
{
  currentInstances: Map<Symbol, IInjectable> = new Map();

  onRegisterDefinitions(
    definitions: Array<{ id: Symbol; class: Class<IInjectable, any> }>
  ) {
    for (const definition of definitions) {
      if (this.currentInstances.has(definition.id)) continue;
      let instance: IInjectable | null = null;
      const defClass = definition.class;
      if (defClass.prototype instanceof Service) {
        instance = new defClass(new InjectionMediator(this));
      } else {
        instance = new defClass();
      }
      if (instance.onInstanceCreated) {
        instance.onInstanceCreated();
      }

      this.currentInstances.set(definition.id, instance);
    }
  }

  onUnregisterDefinitions(ids: Array<Symbol>) {
    for (const id of ids) {
      const instance = this.currentInstances.get(id);
      if (!instance) continue;
      if (instance.cleanUp) {
        instance.cleanUp();
      }
      this.currentInstances.delete(id);
    }
  }

  onInjectInstance(id: Symbol) {
    return this.currentInstances.get(id) ?? null;
  }

  onDropInstances() {
    this.onUnregisterDefinitions(Array.from(this.currentInstances.keys()));
  }

  onListInstanceIds() {
    return Array.from(this.currentInstances.keys());
  }

  onStrategyChange() {
    this.onDropInstances();
  }
}

export interface IInjectionMediator<T extends Class<IInjectable>> {
  inject(id: Symbol): InstanceType<T> | null;
}

class InjectionMediator {
  private instanceManagementStrategy!: IInstanceManagementStrategy<
    Class<IInjectable>
  >;
  constructor(ims: IInstanceManagementStrategy<Class<IInjectable>>) {
    this.instanceManagementStrategy = ims;
  }
  public inject(id: Symbol) {
    return this.instanceManagementStrategy.onInjectInstance(id);
  }
}

class InstanceManager implements IInstanceManager<Class<IInjectable>> {
  private instanceManagementStrategy!: IInstanceManagementStrategy<
    Class<IInjectable>
  >;

  constructor(args: {
    instanceManagementStrategy: IInstanceManagementStrategy<Class<IInjectable>>;
  }) {
    this.instanceManagementStrategy = args.instanceManagementStrategy;
  }

  registerDefinitions(
    definitions: Array<InjectableDefinition<Class<IInjectable>>>
  ) {
    return this.instanceManagementStrategy.onRegisterDefinitions(definitions);
  }

  unregisterDefinitions(ids: Array<Symbol>) {
    this.instanceManagementStrategy.onUnregisterDefinitions(ids);
  }

  injectInstance<S>(id: Symbol) {
    const res = this.instanceManagementStrategy.onInjectInstance(id);
    if (!res) return null;
    return res as S;
  }

  dropInstances() {
    this.instanceManagementStrategy.onDropInstances();
  }

  listInstanceIds() {
    return this.instanceManagementStrategy.onListInstanceIds();
  }

  setInstanceManagementStrategy(
    strategy: IInstanceManagementStrategy<Class<IInjectable>>
  ) {
    if (strategy == this.instanceManagementStrategy) {
      return;
    }
    this.instanceManagementStrategy.onStrategyChange();
    this.instanceManagementStrategy = strategy;
  }
}

type serializableDefinitionArgs<T extends Class<IInjectable>> = {
  name: string;
  serializable: true;
  class: T;
};

type nonSerializableDefinitionArgs<T extends Class<IInjectable>> = {
  name?: string;
  serializable?: false;
  class: T;
};

type InjectableDefinition<T extends Class<IInjectable>> = {
  id: Symbol;
  class: T;
  serializable?: boolean;
};

const createDefinition = <T extends Class<IInjectable>>(
  args: serializableDefinitionArgs<T> | nonSerializableDefinitionArgs<T>
): InjectableDefinition<T> => {
  return {
    id: Symbol(args.name),
    class: args.class,
    serializable: args.serializable,
  };
};

export {
  InstanceManager,
  SimpleInstanceManagementStrategy,
  IInstanceManagementStrategy,
  IInstanceManager,
  InjectionMediator,
  createDefinition,
};
