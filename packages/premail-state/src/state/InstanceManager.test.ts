import { IInjectable } from "./index";
import {
  createDefinition,
  IInstanceManagementStrategy,
  InstanceManager,
  SimpleInstanceManagementStrategy,
} from "./InstanceManager";
import type { Class } from "./types";
import { Store } from "./Store";
import { Service } from "./Service";
const onRegisterDefinitionsSpy = jest.fn();
const onUnregisterDefinitionsSpy = jest.fn();
const onDropInstancesSpy = jest.fn();
const onListInstanceIdsSpy = jest.fn();
const onStrategyChangeSpy = jest.fn();
const onInjectInstanceSpy = jest.fn();
class SpyIMStrat implements IInstanceManagementStrategy<Class<IInjectable>> {
  onRegisterDefinitions = onRegisterDefinitionsSpy;
  onUnregisterDefinitions = onUnregisterDefinitionsSpy;
  onDropInstances = onDropInstancesSpy;
  onInjectInstance = onInjectInstanceSpy;
  onListInstanceIds = onListInstanceIdsSpy;
  onStrategyChange = onStrategyChangeSpy;
}
describe("InstanceManager tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should use the IInstanceManagementStrategy when registerDefinitions", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    const arg: any[] = [];
    im.registerDefinitions(arg);
    expect(onRegisterDefinitionsSpy).toHaveBeenCalled();
    expect(onRegisterDefinitionsSpy).toHaveBeenCalledTimes(1);
    expect(onRegisterDefinitionsSpy).toHaveBeenCalledWith(arg);
  });

  it("Should use the IInstanceManagementStrategy instances when drop is called", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    im.dropInstances();
    expect(onDropInstancesSpy).toHaveBeenCalled();
    expect(onDropInstancesSpy).toHaveBeenCalledTimes(1);
  });
  it("Should use the IInstanceManagementStrategy when injectInstance is called ", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    im.injectInstance(Symbol());
    expect(onInjectInstanceSpy).toHaveBeenCalled();
    expect(onInjectInstanceSpy).toHaveBeenCalledTimes(1);
  });
  it("Should use the IInstanceManagementStrategy when unregisterDefinitions is called ", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    im.unregisterDefinitions([]);
    expect(onUnregisterDefinitionsSpy).toHaveBeenCalled();
    expect(onUnregisterDefinitionsSpy).toHaveBeenCalledTimes(1);
    expect(onUnregisterDefinitionsSpy).toHaveBeenCalledWith([]);
  });
  it("Should use the IInstanceManagementStrategy when listInstanceIds is called ", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    im.listInstanceIds();
    expect(onListInstanceIdsSpy).toHaveBeenCalled();
    expect(onListInstanceIdsSpy).toHaveBeenCalledTimes(1);
  });

  it("Should not use the IInstanceManagementStrategy when setInstanceManagementStrategy is called with the same strategy", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    im.setInstanceManagementStrategy(iman);
    expect(onStrategyChangeSpy).not.toHaveBeenCalled();
  });

  it("Should use the IInstanceManagementStrategy when setInstanceManagementStrategy is called ", () => {
    const iman = new SpyIMStrat();
    const im = new InstanceManager({
      instanceManagementStrategy: iman,
    });
    im.setInstanceManagementStrategy({} as any);
    expect(onStrategyChangeSpy).toHaveBeenCalled();
    expect(onStrategyChangeSpy).toHaveBeenCalledTimes(1);
  });
});

describe("SimpleInstanceManagementStrategy tests", () => {
  it("Should instantiante all definitions when onRegisterDefinitions is called", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    const storeSpy = jest.fn();
    class TestStore extends Store {
      onInstanceCreated = storeSpy;
    }
    const serviceSpy = jest.fn();

    class TestService extends Service {
      onInstanceCreated = serviceSpy;
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    im.registerDefinitions([testStoreDefinition]);
    expect(storeSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it("Should retrieve instances when onInjectInstance is called", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    const storeSpy = jest.fn();
    class TestStore extends Store {
      onInstanceCreated = storeSpy;
    }
    const serviceSpy = jest.fn();

    class TestService extends Service {
      onInstanceCreated = serviceSpy;
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    expect(im.injectInstance(testServiceDefinition.id)).not.toBe(null);
    expect(im.injectInstance(testServiceDefinition.id)).not.toBe(null);
    expect(im.injectInstance(Symbol())).toBe(null);
  });

  it("Should delete all specified instances when onUnregisterDefinitions is called", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    const storeSpy = jest.fn();
    class TestStore extends Store {
      cleanUp = storeSpy;
    }

    const serviceSpy = jest.fn();

    class TestService extends Service {
      cleanUp = serviceSpy;
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    im.unregisterDefinitions([
      testStoreDefinition.id,
      testServiceDefinition.id,
      Symbol(),
    ]);
    expect(storeSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it("Should delete all instances when onDropInstances is called", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    const storeSpy = jest.fn();
    class TestStore extends Store {
      cleanUp = storeSpy;
    }

    const serviceSpy = jest.fn();

    class TestService extends Service {
      cleanUp = serviceSpy;
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    im.dropInstances();
    expect(storeSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it("Should list all instance ids when onListInstanceIds is called", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });

    const storeSpy = jest.fn();
    class TestStore extends Store {
      cleanUp = storeSpy;
    }

    const serviceSpy = jest.fn();

    class TestService extends Service {
      cleanUp = serviceSpy;
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    const ids = im.listInstanceIds();
    expect(ids).toContain(testStoreDefinition.id);
    expect(ids).toContain(testServiceDefinition.id);
    expect(ids).toHaveLength(2);
  });

  it("Should drop all instance ids when onStrategyChange is called", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });

    const storeSpy = jest.fn();
    class TestStore extends Store {
      cleanUp = storeSpy;
    }

    const serviceSpy = jest.fn();

    class TestService extends Service {
      cleanUp = serviceSpy;
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    im.setInstanceManagementStrategy({} as any);
    expect(storeSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});

describe("InjectionMediator tests", () => {
  it("Should inject instances from the instance manager", () => {
    const im = new InstanceManager({
      instanceManagementStrategy: new SimpleInstanceManagementStrategy(),
    });
    const storeSpy = jest.fn();
    class TestStore extends Store {
      onInstanceCreated = storeSpy;
      value = 2;
    }
    const serviceSpy = jest.fn();

    class TestService extends Service {
      onInstanceCreated = serviceSpy;
      store = this.inject(testStoreDefinition);
      unknownStore = this.inject({ id: Symbol(), class: class {} });
    }

    const testStoreDefinition = createDefinition({ class: TestStore });
    const testServiceDefinition = createDefinition({ class: TestService });
    im.registerDefinitions([testStoreDefinition, testServiceDefinition]);
    const service = im.injectInstance(testServiceDefinition.id) as TestService;
    // known store should be an instance
    expect(service.store.instance).not.toBe(null);
    expect(service.store.instance?.value).toBe(2);
    // unknown store should be null
    expect(service.unknownStore.instance).toBe(null);
  });
});
