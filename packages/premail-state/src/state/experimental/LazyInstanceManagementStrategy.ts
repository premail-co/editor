import { Class, IInjectable } from "../index";
import {
  IInstanceManagementStrategy,
  InjectionMediator,
} from "../InstanceManager";
import { Service } from "../Service";

class EXPERIMENTAL_LazyInstanceManagementStrategy
  implements IInstanceManagementStrategy<Class<IInjectable, any>>
{
  registeredDefinitions: Map<
    Symbol,
    {
      instance: IInjectable | null;
      generateInstance: () => IInjectable;
    }
  > = new Map();

  onRegisterDefinitions(
    definitions: Array<{ id: Symbol; class: Class<IInjectable> }>
  ) {
    for (const definition of definitions) {
      if (this.registeredDefinitions.has(definition.id)) continue;
      this.registeredDefinitions.set(definition.id, {
        instance: null,
        generateInstance: () => {
          let instance: IInjectable | null = null;
          const defClass = definition.class;
          if (defClass.prototype instanceof Service) {
            instance = new defClass(new InjectionMediator(this));
          } else {
            instance = new defClass();
          }
          return instance;
        },
      });
    }
  }

  onUnregisterDefinitions(ids: Array<Symbol>) {
    for (const id of ids) {
      const retrievedDefinition = this.registeredDefinitions.get(id);
      if (!retrievedDefinition) continue;
      if (
        retrievedDefinition.instance &&
        retrievedDefinition.instance.cleanUp
      ) {
        retrievedDefinition.instance?.cleanUp();
      }
      this.registeredDefinitions.delete(id);
    }
  }

  onInjectInstance(id: Symbol) {
    const retrieved = this.registeredDefinitions.get(id) ?? null;
    if (retrieved == null) {
      return null;
    }
    let instance = retrieved.instance;

    if (instance == null) {
      instance = retrieved.generateInstance();
      this.registeredDefinitions.set(id, { ...retrieved, instance });
    }

    return instance;
  }

  onListInstanceIds() {
    return Array.from(this.registeredDefinitions.keys());
  }

  onDropInstances() {
    this.onUnregisterDefinitions(Array.from(this.registeredDefinitions.keys()));
  }

  onStrategyChange() {
    this.onDropInstances();
  }
}

export { EXPERIMENTAL_LazyInstanceManagementStrategy };
