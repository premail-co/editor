import { Store } from "./Store";
import { createStoreResgistry } from "./StoreRegistry";
class TestStore extends Store {
  constructor() {
    super();
  }
}

describe("StoreContainer tests", () => {
  it("Should return true when register is called with a new store instance.", () => {
    const store = { id: Symbol(), instance: new TestStore() };
    const storeRegistry = createStoreResgistry();
    expect(storeRegistry.register(store)).toBe(true);
  });

  it("Should return false when register is called with a known store instance.", () => {
    const store = { id: Symbol(), instance: new TestStore() };
    const storeRegistry = createStoreResgistry();
    storeRegistry.register(store);
    expect(storeRegistry.register(store)).toBe(false);
  });

  it("Should throw when register is called after instance is destroyed.", () => {
    const store = { id: Symbol(), instance: new TestStore() };
    const storeRegistry = createStoreResgistry();
    storeRegistry.destroy();
    const registerOnDestroyedRegistry = () => {
      storeRegistry.register(store);
    };
    expect(registerOnDestroyedRegistry).toThrow();
  });

  it("Should return true when unregister is called with a known store instance.", () => {
    const store = { id: Symbol(), instance: new TestStore() };
    const storeRegistry = createStoreResgistry();
    storeRegistry.register(store);
    expect(storeRegistry.unregister(store.id)).toBe(true);
  });

  it("Should return false when unregister is called with an unknown store instance.", () => {
    const storeRegistry = createStoreResgistry();
    expect(storeRegistry.unregister(Symbol())).toBe(false);
  });

  it("Should throw when unregister is called after instance is destroyed.", () => {
    const storeRegistry = createStoreResgistry();
    storeRegistry.destroy();
    const unregisterOnDestroyedRegistry = () => {
      storeRegistry.unregister(Symbol());
    };
    expect(unregisterOnDestroyedRegistry).toThrow();
  });

  it("Should return a store instance when lookup is called with a known id.", () => {
    const store = { id: Symbol(), instance: new TestStore() };
    const storeRegistry = createStoreResgistry();
    storeRegistry.register(store);
    expect(storeRegistry.lookup(store.id)).toBe(store.instance);
  });

  it("Should return null when lookup is called with an unknown id.", () => {
    const storeRegistry = createStoreResgistry();
    expect(storeRegistry.lookup(Symbol())).toBe(null);
  });

  it("Should throw when lookup is called after instance is destroyed.", () => {
    const storeRegistry = createStoreResgistry();
    storeRegistry.destroy();

    const lookupOnDestroyedRegistry = () => {
      storeRegistry.lookup(Symbol());
    };
    expect(lookupOnDestroyedRegistry).toThrow();
  });

  it("Should destroy all registered stores when destroy is called.", () => {
    const storeRegistry = createStoreResgistry();
    const spy = jest.fn();
    class SpyStore extends Store {
      destroy() {
        spy();
      }
    }
    const store = { id: Symbol(), instance: new SpyStore() };
    storeRegistry.register(store);
    storeRegistry.destroy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Should throw when destroy is called after instance is destroyed.", () => {
    const storeRegistry = createStoreResgistry();
    storeRegistry.destroy();
    const destroyOnDestroyedRegistry = () => {
      storeRegistry.destroy();
    };
    expect(destroyOnDestroyedRegistry).toThrow();
  });
});
