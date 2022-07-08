import { IObservable } from "./Observable";
import { IInstantiable, IRegistry } from "./types";

interface IStore<T> extends IRegistry<T>, IInstantiable {}

abstract class Store implements IStore<IObservable<any>> {
  private regsitry: Map<Symbol, IObservable<any>> | null = null;
  constructor() {
    this.regsitry = new Map();
  }

  register(args: { id: Symbol; instance: IObservable<any> }) {
    if (this.regsitry == null) {
      throw new Error(`Store instance already destroyed`);
    }

    if (this.regsitry.has(args.id)) {
      return false;
    }

    this.regsitry.set(args.id, args.instance);

    return true;
  }

  unregister(id: Symbol) {
    if (this.regsitry == null) {
      throw new Error(`Store instance already destroyed`);
    }

    if (!this.regsitry.has(id)) {
      return false;
    }

    return this.regsitry.delete(id);
  }

  destroy() {
    if (this.regsitry == null) {
      throw new Error(`Store instance already destroyed`);
    }
    this.regsitry.clear();
    this.regsitry = null;
  }
}

const createStoreId = <T extends typeof Store>(args: {
  name?: string;
  class: T;
}) => {
  return { id: Symbol(args.name), class: args.class };
};

type StoreDerived = { new (): Store } & typeof Store;
type StoreInstance = Store;

export { Store, createStoreId, StoreInstance };
export type { IStore, StoreDerived };
