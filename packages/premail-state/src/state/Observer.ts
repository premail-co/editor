import { IInstantiable, ISubscriber } from "./types";

type ObserverCallback<T> = (value: T) => void;

interface IObserver<T> extends IInstantiable, ISubscriber<T> {}

class Observer<T> implements IObserver<T> {
  private cb: ObserverCallback<T> | null = null;

  constructor(cb: ObserverCallback<T>) {
    this.cb = cb;
  }

  public update(value: T) {
    if (this.cb == null) {
      throw new Error(``);
    }
    this.cb(value);
  }

  destroy() {
    if (this.cb == null) {
      throw new Error(`Observer already destroyed`);
    }
    this.cb = null;
  }
}

const createObserver = <T>(cb: ObserverCallback<T>) => {
  return { id: Symbol(), instance: new Observer(cb) };
};

export { createObserver };
