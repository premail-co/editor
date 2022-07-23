import {
  createDefinition,
  InstanceManager,
  SimpleInstanceManagementStrategy,
} from "./InstanceManager";
import { Service } from "./Service";
class TestService extends Service {}
const ServiceDefinition = createDefinition({ class: TestService });

describe("Service tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should create an injectable Service", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    im.registerDefinitions([ServiceDefinition]);

    const instance = im.injectInstance(ServiceDefinition.id);
    expect(instance).toBeInstanceOf(TestService);
  });
});
