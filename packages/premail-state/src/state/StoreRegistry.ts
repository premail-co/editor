import { Store } from "./Store";
import { IInstantiable, IRegistry } from "./types";

interface IStoreRegsitry extends IRegistry<Store>, IInstantiable {
  lookup<T extends Store>(id: Symbol): T | null;
}

class StoreRegistry implements IStoreRegsitry {
  registry: Map<Symbol, Store> | null = new Map<Symbol, Store>();

  lookup<T extends Store>(id: Symbol) {
    if (this.registry == null) {
      throw new Error(`StoreContainer instance alreay destroyed`);
    }
    const rv = this.registry.get(id);

    if (rv == null) return null;

    return rv as T;
  }

  register(args: { id: Symbol; instance: Store }) {
    if (this.registry == null) {
      throw new Error(`StoreContainer instance alreay destroyed`);
    }
    if (this.registry.has(args.id)) {
      return false;
    }
    this.registry.set(args.id, args.instance);
    return true;
  }

  unregister(id: Symbol) {
    if (this.registry == null) {
      throw new Error(`StoreContainer instance alreay destroyed`);
    }

    return this.registry.delete(id);
  }
  destroy() {
    if (this.registry == null) {
      throw new Error(`StoreContainer instance alreay destroyed`);
    }

    const registry = this.registry;

    for (const [id, entry] of registry.entries()) {
      this.registry.delete(id);
      entry.destroy();
    }

    this.registry = null;
  }
}

const createStoreResgistry = () => {
  return new StoreRegistry();
};

export { createStoreResgistry };
export type { IStoreRegsitry };
