import { IInstanceManager, Class, IInjectable } from "../../index";

interface IStateContext {
  instanceManager: IInstanceManager<Class<IInjectable>> | null;
}

export type { IStateContext };
