import { useInjectable, useObservable } from "@premail/state";
import { ToolBarStoreDefinition } from "../../../stores/ToolbarStore/ToolbarStore";
const useActiveTab = () => {
  const ToolbarStore = useInjectable(ToolBarStoreDefinition);
  const [activeTab, setActiveTab] = useObservable(
    ToolbarStore?.activeTab ?? null
  );

  return { activeTab, setActiveTab };
};

export { useActiveTab };
