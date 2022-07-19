# @premail/state

## UML diagram Usage by user

```typescript
class ExampleService implements Service {
  readonly injectedStore = this.inject(storeDefinition2);
  readonly getValue = () => {
    return this.injectedStore.instance.customObservable.getValue();
  };
  readonly cleanUp = () => {
    this.injectedStore = null;
  };
}

const serviceDefinition = createDefinition({ class: UserStore });

class ExampleStore implements Store {
  readonly customObservable = new Observable(100);
  readonly cleanUp = () => {
    this.customObservable.clearSubscriptions();
  };
}

const storeDefinition = createDefinition({ class: UserStore2 });
```

```mermaid
classDiagram

    class Store{
        <<abstract>>
        public cleanUp()
    }

    class Service{
        <<abstract>>
        public inject(store)
        public cleanUp()
        private injectionMediator
    }

    class ExampleStore{
        readonly customObservable: Observable
        readonly customMethod()
    }

    class ExampleService{
        readonly injectedStore: ExampleStore
        readonly cleanUp()
    }

    class Observable {
        public getValue()
        public setValue()
        public notify()
        public subscribe()
        public unsubscribe()
        public clearSubscriptions()
    }

    class Observer {
        public update()
        public clearCallback()
    }

    Service "1" -->  "1" IInjectionMediator
    ExampleStore --> Store : implements
    ExampleService --> Service : implements

    ExampleStore o--> Observable
    Observable o--> Observer


```

## UML diagram core classes

### Stores and services

```mermaid
classDiagram
    class IInjectable{
        <<interface>>
        public cleanUp()
    }

    class IInjector {
        <<interface>>
        public inject(store)
    }
    class Store{
        <<abstract>>
        public cleanUp()
    }

    class Service{
        <<abstract>>
        public inject(store)
        public cleanUp()
        private injectionMediator
    }
    Store --|> IInjectable : implements
    Service --|> IInjectable : implements
    Service --|> IInjector : implements


```

### Instance manager and helper interfaces

```mermaid
classDiagram

    class IInstanceManager{
      <<interface>>
      public registerDefinition()
      public unregisterDefinition()
      public dropInstances()
      public lookupInstance()
      public listDefinitions()
      public setInstanceManagementStrategy()
    }



    class IInstanceManagementStrategy {
      <<interface>>
      public onRegisterDefinition()
      public onRemoveDefinition()
      public onDropInstances()
      public onLookupInstance()
      public onListDefinitions()
    }


    class IInjectionMediator {
        <<interface>>
        public inject()
    }

    class IInjectable{
        <<interface>>
        public cleanUp()
    }

    class IInjector {
        <<interface>>
        public inject(store)
    }

    IInstanceManager --> IInstanceManagementStrategy
    IInjectionMediator "1" --> "1" IInstanceManagementStrategy

    IInjector --> IInjectionMediator

    IInstanceManagementStrategy --o "0..n" IInjectable




```
