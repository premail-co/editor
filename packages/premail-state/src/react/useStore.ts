import { Store } from "../state/Store";
import { useStateContext } from "./useStateContext";

const useStore = <T extends typeof Store>(store: { id: Symbol; class: T }) => {
  const stateContext = useStateContext();

  const retrievedStore =
    stateContext.storeRegisty && stateContext.storeRegisty.lookup(store.id);

  if (retrievedStore == null) {
    return null;
  }
  const returnValue = retrievedStore as InstanceType<T>;
  return returnValue;
};

export { useStore };
