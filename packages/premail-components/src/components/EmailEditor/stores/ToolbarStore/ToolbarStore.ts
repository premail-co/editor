import { Store, Observable, createDefinition } from "@premail/state";

enum ToolbarTab {
  CONTENT,
  LAYOUT,
  EMAIL_SETINGS,
  ATTRIBUTE_EDITOR,
}

interface Row1ColData {
  type: "Row1Col";
  rowId: string;
}

type TabData = Row1ColData | null;
class ToolBarStore extends Store {
  activeTab = new Observable<ToolbarTab>(ToolbarTab.CONTENT);
  data = new Observable<TabData>(null);

  cleanUp = () => {
    this.activeTab.clearSubscribers();
  };
}

const ToolBarStoreDefinition = createDefinition({
  class: ToolBarStore,
  name: "ToolBarStore",
});

export { ToolBarStoreDefinition, ToolbarTab, ToolBarStore };
