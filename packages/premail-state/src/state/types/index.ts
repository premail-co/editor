/**
 * Classes that implment IInstantiable can be cleaned up, although javascript doens't support
 * reclaiming memory, this method is useful to remove all references to objects that can cause memory
 * leaks or clean up other side effects,
 */
export interface IInstantiable {
  /**
   * Clean up function
   */
  cleanUp(): void;
}

interface ISubscriber<T> {
  update(nextValue: T): void;
  clearCallback(): void;
}

interface ISubbable<T> {
  /**
   * Register an subscriber and return the observer ID
   */
  subscribe(args: { id: Symbol; instance: ISubscriber<T> }): boolean;

  /**
   * Removes the observer from the observables list
   */
  unsubscribe(id: Symbol): boolean;
  /**
   * Removes the observer from the observables list
   */
  notify(omitObservers?: Array<Symbol>): void;

  clearSubscribers(): void;
}

interface IEncapsulated<T> {
  getValue(): T;
  setValue(value: T): void;
}

interface Ilookup<T, V> {
  lookup(id: V): T | null;
}

interface IRegistry<T> {
  register(args: { id: Symbol; instance: T }): boolean;
  unregister(id: Symbol): boolean;
}

interface IInjector {
  inject(id: { id: Symbol; class: Class<IInjectable> }): {
    instance: InstanceType<Class<IInjectable>> | null;
  };
}

interface IInjectable {
  readonly pack?: () => string;
  readonly unpack?: (serialized: string) => void;
  readonly onStoresRestored?: () => void;
  readonly onInstanceCreated?: () => void;
  readonly cleanUp?: () => void;
}

type Class<I, Args extends any[] = any[]> = new (...args: Args) => I;

export type {
  ISubbable,
  IEncapsulated,
  IRegistry,
  Ilookup,
  ISubscriber,
  IInjector,
  IInjectable,
  Class,
};
