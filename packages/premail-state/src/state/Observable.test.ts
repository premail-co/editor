import {
  createObservableResource,
  createObservable,
  createLazyObsevable,
} from "./Observable";
import { createObserver } from "./Observer";

describe("createObservableResource Tests", () => {
  it("Should create an observable resource", () => {
    const initialValue = 100;
    const name = "Number observable";
    const resource = createObservableResource({ name, initialValue });

    expect(resource.initialValue).toBe(initialValue);
    expect(resource.id.description).toBe(name);
    expect(typeof resource.instantiator).toBe("function");
  });
});

describe("createObservable Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should get the inital value", () => {
    expect(createObservable(100).instance.getValue()).toBe(100);
  });

  it("Should set the value", () => {
    const { instance } = createObservable(0);
    instance.setValue(50);
    expect(instance.getValue()).toBe(50);
  });

  it("Should return true when subscribe called with new observer", () => {
    const spy = jest.fn();
    const observer = createObserver<null>(spy);
    const observable = createObservable(null);
    const result = observable.instance.subscribe(observer);
    expect(result).toBe(true);
  });

  it("Should return false when subscribe called with existing observer", () => {
    const spy = jest.fn();
    const observer = createObserver<null>(spy);
    const observable = createObservable(null);
    expect(observable.instance.subscribe(observer)).toBe(true);
    expect(observable.instance.subscribe(observer)).toBe(false);
  });

  it("Should return true when unsubscribe called with existing observer", () => {
    const spy = jest.fn();
    const observer = createObserver<null>(spy);
    const { instance: observable } = createObservable(null);
    observable.subscribe(observer);
    expect(observable.unsubscribe(observer.id)).toBe(true);
  });

  it("Should return false when unsubscribe called with unknown observer", () => {
    const { instance: observable } = createObservable(null);
    expect(observable.unsubscribe(Symbol())).toBe(false);
  });

  it("Should call all observers cb when notify is called", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn();
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.setValue(100);
    observable.notify();

    expect(observer1Spy).toHaveBeenCalledWith(100);
    expect(observer1Spy).toHaveBeenCalledTimes(1);

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).toHaveBeenCalledWith(100);
    expect(observer3Spy).toHaveBeenCalledTimes(1);
  });

  it("Should call all observers cb when notify is called with empty omit list", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn();
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.setValue(100);
    observable.notify([]);

    expect(observer1Spy).toHaveBeenCalledWith(100);
    expect(observer1Spy).toHaveBeenCalledTimes(1);

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).toHaveBeenCalledWith(100);
    expect(observer3Spy).toHaveBeenCalledTimes(1);
  });

  it("Should call all observers cb when notify is called with unknown id to omit", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn();
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.setValue(100);
    observable.notify([Symbol(1)]);

    expect(observer1Spy).toHaveBeenCalledWith(100);
    expect(observer1Spy).toHaveBeenCalledTimes(1);

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).toHaveBeenCalledWith(100);
    expect(observer3Spy).toHaveBeenCalledTimes(1);
  });

  it("Should call some observers cb when notify is called with known ids to omit", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn();
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.setValue(100);
    observable.notify([observer1.id]);

    expect(observer1Spy).not.toHaveBeenCalled();

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).toHaveBeenCalledWith(100);
    expect(observer3Spy).toHaveBeenCalledTimes(1);
  });

  it("Should call some observers cb when notify is called with known and unknown ids to omit", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn();
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.setValue(100);
    observable.notify([observer1.id, Symbol(), Symbol(), observer3.id]);

    expect(observer1Spy).not.toHaveBeenCalled();

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).not.toHaveBeenCalled();
  });

  it("Should not call unsubscribed observers", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn();
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.unsubscribe(observer1.id);
    observable.unsubscribe(observer3.id);

    observable.setValue(100);
    observable.notify([]);

    expect(observer1Spy).not.toHaveBeenCalled();

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).not.toHaveBeenCalled();
  });

  it("Should call all callable obververs if any observer cb throws", () => {
    const observer1Spy = jest.fn();
    const observer2Spy = jest.fn(() => {
      throw new Error("dead cb");
    });
    const observer3Spy = jest.fn();
    const observer1 = createObserver(observer1Spy);
    const observer2 = createObserver(observer2Spy);
    const observer3 = createObserver(observer3Spy);

    const { instance: observable } = createObservable<null | number>(null);

    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.subscribe(observer3);

    observable.setValue(100);
    observable.notify([]);

    expect(observer1Spy).toHaveBeenCalledWith(100);
    expect(observer1Spy).toHaveBeenCalledTimes(1);

    expect(observer2Spy).toHaveBeenCalledWith(100);
    expect(observer2Spy).toHaveBeenCalledTimes(1);

    expect(observer3Spy).toHaveBeenCalledWith(100);
    expect(observer3Spy).toHaveBeenCalledTimes(1);
  });

  it("Should not notify observers if clearSubscribers is called", () => {
    const spy = jest.fn();
    const observer = createObserver<number>(spy);
    const observable = createObservable(0);
    observable.instance.subscribe(observer);
    observable.instance.clearSubscribers();
    observable.instance.setValue(2);
    observable.instance.notify();

    expect(spy).not.toHaveBeenCalled();
  });
});

describe("createLazyObservable Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return an observable", () => {
    const lazyobs = createLazyObsevable(100);
    const reguobs = createObservable(100);
    expect(typeof lazyobs.instance).toBe(typeof reguobs.instance);
  });

  it("Should return the same observable instance", () => {
    const lazyobs = createLazyObsevable(100);
    expect(lazyobs.instance).toBe(lazyobs.instance);
  });

  it("Should get the inital value", () => {
    expect(createLazyObsevable(100).instance.getValue()).toBe(100);
  });

  it("Should set the value", () => {
    const { instance } = createLazyObsevable(0);
    instance.setValue(50);
    expect(instance.getValue()).toBe(50);
  });
});
