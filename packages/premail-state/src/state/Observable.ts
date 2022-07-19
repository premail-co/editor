import { IEncapsulated, ISubscriber, ISubbable } from "./types";

type ObserverID = Symbol;

interface IObservable<T> extends ISubbable<T>, IEncapsulated<T> {}

class Observable<T> implements IObservable<T> {
  private value: T;
  private subscribers: Map<Symbol, ISubscriber<T>> = new Map();

  constructor(value: T) {
    this.value = value;
  }

  /**
   * Mutates the observable's value
   * @param value the next value of the observable
   */
  public setValue(value: T) {
    this.value = value;
  }

  /**
   * Gets the current observable value
   * @returns the value attribute of the observable
   */
  public getValue() {
    return this.value;
  }

  /**
   * Adds a subscriber entry to the internal subscriber map.
   * @param subscriber Subscriber instance with identifier and callback
   * @returns true if observer was subscribed successfully, false if already subscribed
   * @throws Error if the observer instance was already marked as destroyed
   */
  public subscribe(args: { id: Symbol; instance: ISubscriber<T> }) {
    if (this.subscribers.has(args.id)) {
      return false;
    }
    this.subscribers.set(args.id, args.instance);
    return true;
  }

  /**
   * Unsubscribes a subscriber with given id
   * @param id the id of the subscriber
   * @returns true if the subscriber was removed successfully , false if it wasn't found.
   * @throws Error if the observer instance was already marked as destroyed
   */
  public unsubscribe(id: Symbol) {
    if (this.subscribers.has(id) == false) {
      return false;
    }
    return this.subscribers.delete(id);
  }

  /**
   * Calls the observers callback with the lates observable value
   * @param omitObservers list of observer to omit from notification
   * @throws Error if the observer instance was already marked as destroyed
   */
  public notify(omitObservers?: Array<ObserverID>) {
    const omit = omitObservers ?? [];

    for (const [id, subscriber] of this.subscribers.entries()) {
      try {
        if (!omit.includes(id)) {
          subscriber.update(this.value);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Unable to call observer callback`);
          console.error(`${e.message}`);
          console.error(`${e.stack}`);
        }
      }
    }
  }

  /**
   * Clears the subscribers map and prevents further operations.
   * This prevents references to unused functions being kept around.
   */
  public clearSubscribers() {
    this.subscribers.clear();
  }
}

interface IObservableResource<T> {
  readonly id: Symbol;
  readonly instantiator: typeof Observable;
  readonly initialValue: T;
}

const createObservable = <T>(value: T) => {
  return { id: Symbol(), instance: new Observable(value) };
};

const createLazyObsevable = <T>(value: T) => {
  let instance: Observable<T> | null = null;
  return {
    id: Symbol(),
    get instance() {
      if (instance == null) {
        instance = new Observable(value);
      }
      return instance;
    },
  };
};

const createObservableResource = <T>(fields: {
  name?: string;
  initialValue: T;
}): IObservableResource<T> => {
  return {
    id: Symbol(fields.name),
    instantiator: Observable,
    initialValue: fields.initialValue,
  };
};

export {
  createObservableResource,
  createObservable,
  createLazyObsevable,
  Observable,
};
export type { IObservableResource, ObserverID, IObservable };
