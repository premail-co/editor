import { createStoreId, Store } from "./Store";
import { createObservable } from "./Observable";

class TestStore extends Store {
  constructor() {
    super();
  }
}

describe("Store tests", () => {
  it("Should return true when register is called with a new observable", () => {
    const store = new TestStore();
    const observable = createObservable(100);
    expect(store.register(observable)).toBe(true);
  });

  it("Should return false when register is called with a known observable", () => {
    const store = new TestStore();
    const observable = createObservable(100);
    store.register(observable);
    expect(store.register(observable)).toBe(false);
  });

  it("Should throw when register is called after instance is destroyed", () => {
    const store = new TestStore();
    const observable = createObservable(100);
    store.destroy();
    const registerOnDestroyedStore = () => {
      store.register(observable);
    };
    expect(registerOnDestroyedStore).toThrow();
  });

  it("Should return true when unregister is called with a known observable", () => {
    const store = new TestStore();
    const observable = createObservable(100);
    store.register(observable);
    expect(store.unregister(observable.id)).toBe(true);
  });

  it("Should return false when unregister is called with an unknown observable", () => {
    const store = new TestStore();
    expect(store.unregister(Symbol())).toBe(false);
  });

  it("Should throw when unregister is called after instance is destroyed", () => {
    const store = new TestStore();
    store.destroy();
    const unRegisterOnDestroyedStore = () => {
      store.unregister(Symbol());
    };
    expect(unRegisterOnDestroyedStore).toThrow();
  });

  it("Should throw when destroy is called after instance is destroyed", () => {
    const store = new TestStore();
    store.destroy();
    const destroyOnDestroyedStore = () => {
      store.destroy();
    };
    expect(destroyOnDestroyedStore).toThrow();
  });
});

describe("createStoreId tests", () => {
  test("it should create a store id", () => {
    const storeId = createStoreId({ name: "store", class: TestStore });
    expect(storeId.id.description).toBe("store");
    expect(storeId.class).toBe(TestStore);
  });
});
