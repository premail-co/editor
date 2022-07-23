import { ISubscriber } from "./types";

type ObserverCallback<T> = (value: T) => void;

interface IObserver<T> extends ISubscriber<T> {}

const noop = () => {};
class Observer<T> implements IObserver<T> {
  private cb: ObserverCallback<T> = noop;

  constructor(cb: ObserverCallback<T>) {
    this.cb = cb;
  }

  public update(value: T) {
    this.cb(value);
  }

  clearCallback() {
    this.cb = noop;
  }
}

const createObserver = <T>(cb: ObserverCallback<T>) => {
  return { id: Symbol(), instance: new Observer(cb) };
};

export { createObserver };
