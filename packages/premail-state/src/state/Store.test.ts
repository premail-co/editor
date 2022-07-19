import {
  createDefinition,
  InstanceManager,
  SimpleInstanceManagementStrategy,
} from "./InstanceManager";
import { Store } from "./Store";
class TestStore extends Store {}
const storeDefinition = createDefinition({ class: TestStore });

describe("Store tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should create an injectable Store", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    im.registerDefinitions([storeDefinition]);

    const instance = im.injectInstance(storeDefinition.id);
    expect(instance).toBeInstanceOf(TestStore);
  });
});
