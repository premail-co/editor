import {
  InstanceManager,
  SimpleInstanceManagementStrategy,
} from "@premail/state";
import {
  ToolBarStoreDefinition,
  ToolBarStore,
  ToolbarTab,
} from "./ToolbarStore";
describe("ToolbarStore test", () => {
  const instanceManagementStrategy = new SimpleInstanceManagementStrategy();
  const im = new InstanceManager({
    instanceManagementStrategy,
  });

  let storeInstance: ToolBarStore | null = null;

  beforeEach(() => {
    im.registerDefinitions([ToolBarStoreDefinition]);
    storeInstance = im.injectInstance(ToolBarStoreDefinition.id);
  });
  afterEach(() => {
    im.dropInstances();
  });

  it("Should create an active tab observable with ToolbarTab.CONTENT as default value", () => {
    expect(storeInstance?.activeTab.getValue()).toBe(ToolbarTab.CONTENT);
  });
});
