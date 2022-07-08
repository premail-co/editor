import React from "react";
import { StateContext } from "./StateContext";
import { createStoreResgistry, IStoreRegsitry } from "../state/StoreRegistry";
import type { createStoreId, StoreDerived } from "../state/Store";

interface IStateContextProviderProps extends React.PropsWithChildren<{}> {
  stores: Array<ReturnType<typeof createStoreId<StoreDerived>>>;
}

const StateContextProvider = (props: IStateContextProviderProps) => {
  const [storeRegisty, setStoreRegistry] =
    React.useState<IStoreRegsitry | null>(null);

  React.useEffect(() => {
    const localreg = createStoreResgistry();
    for (const store of props.stores) {
      localreg.register({
        id: store.id,
        instance: new store.class(),
      });
    }
    setStoreRegistry(localreg);
    return () => {
      localreg.destroy();
    };
  }, []);

  return (
    <StateContext.Provider value={{ storeRegisty }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContextProvider };
export type { IStateContextProviderProps };
