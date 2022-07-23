import { Store, Observable, createDefinition } from "@premail/state";

enum ToolbarTab {
  CONTENT,
  LAYOUT,
  EMAIL_SETINGS,
}

class ToolBarStore extends Store {
  activeTab = new Observable<ToolbarTab>(ToolbarTab.CONTENT);

  cleanUp = () => {
    this.activeTab.clearSubscribers();
  };
}

const ToolBarStoreDefinition = createDefinition({
  class: ToolBarStore,
  name: "ToolBarStore",
});

export { ToolBarStoreDefinition, ToolbarTab, ToolBarStore };
