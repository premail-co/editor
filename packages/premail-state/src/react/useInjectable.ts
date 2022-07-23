import { Store } from "../state/Store";
import { useStateContext } from "./useStateContext";

const useInjectable = <T extends typeof Store>(store: {
  id: Symbol;
  class: T;
}) => {
  const stateContext = useStateContext();

  const injected =
    stateContext.instanceManager &&
    stateContext.instanceManager.injectInstance(store.id);

  if (injected == null) {
    return null;
  }
  return injected as InstanceType<T>;
};

export { useInjectable };
