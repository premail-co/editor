import { IInjectable } from "./types";

abstract class Store implements IInjectable {
  readonly pack?: () => string;
  readonly unpack?: (serialized: string) => void;
  readonly onRestore?: () => void;
  readonly onInstanceCreated?: () => void;
  readonly cleanUp?: () => void;
}

export { Store };
