import { IInjectionMediator } from "./InstanceManager";
import { IInjectable, IInjector, Class } from "./types";

abstract class Service implements IInjectable, IInjector {
  private im: IInjectionMediator<Class<IInjectable>>;
  constructor(im: IInjectionMediator<Class<IInjectable>>) {
    this.im = im;
  }

  readonly inject = <T extends Class<IInjectable>>(store: {
    id: Symbol;
    class: T;
  }) => {
    const im = this.im;
    return {
      get instance() {
        const lookup = im.inject(store.id);
        if (lookup == null) {
          return null;
        }
        return lookup as InstanceType<T>;
      },
    };
  };

  readonly pack?: () => string;
  readonly unpack?: (serialized: string) => void;
  readonly onRestore?: () => void;
  readonly onInstanceCreated?: () => void;
  readonly cleanUp?: () => void;
}

export { Service };
