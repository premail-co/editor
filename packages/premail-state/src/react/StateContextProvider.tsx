import React from "react";
import { StateContext } from "./StateContext";
import { InstanceManager } from "../index";
import {
  createDefinition,
  SimpleInstanceManagementStrategy,
} from "../state/InstanceManager";
import type { Class, IInjectable } from "../state/types";
interface IStateContextProviderProps extends React.PropsWithChildren<{}> {
  injectables: Array<ReturnType<typeof createDefinition<Class<IInjectable>>>>;
}

const StateContextProvider = (props: IStateContextProviderProps) => {
  const instanceManager = React.useMemo(
    () =>
      new InstanceManager({
        instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
      }),
    []
  );
  const previousInjectables = React.useRef<
    IStateContextProviderProps["injectables"]
  >([]);

  const [activeInstances, setState] = React.useState<Symbol[]>([]);

  React.useEffect(() => {
    return () => {
      instanceManager.dropInstances();
    };
  }, [instanceManager]);

  React.useEffect(() => {
    const currSet = new Set(props.injectables);
    const prevSet = new Set(previousInjectables.current);
    const diff = [...prevSet].filter((element) => !currSet.has(element));
    instanceManager.unregisterDefinitions(diff.map((def) => def.id));
    instanceManager.registerDefinitions(Array.from(currSet));
    setState(instanceManager.listInstanceIds());
    previousInjectables.current = props.injectables;

    return () => {};
  }, [instanceManager, props.injectables]);

  return React.useMemo(
    () => (
      <StateContext.Provider value={{ instanceManager }}>
        {props.children}
      </StateContext.Provider>
    ),
    [activeInstances]
  );
};

export { StateContextProvider };
export type { IStateContextProviderProps };
