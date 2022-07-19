import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { createDefinition } from "../index";
import { Observable } from "../state/Observable";
import { Store } from "../state/Store";
import { StateContextProvider } from "./StateContextProvider";
import { useInjectable } from "./useInjectable";

const STORE_CONSUMER_ID = "store-consumer-testid";

class TestStore extends Store {
  valueobservable = new Observable(100);

  destroy() {
    this.valueobservable.clearSubscribers();
  }
}
const testStore = createDefinition({ class: TestStore });

const StoreConsumerComponent = () => {
  const store = useInjectable(testStore);
  if (store == null) {
    return <>"null"</>;
  }
  return (
    <div data-testid={STORE_CONSUMER_ID}>
      {store && store.valueobservable.getValue()}
    </div>
  );
};

describe("useStore tests", () => {
  let container: HTMLElement | null = document.createElement("div");
  let root: ReactDOM.Root | null = null;

  beforeEach(() => {
    const newContainer = document.createElement("div");
    document.body.appendChild(newContainer);
    act(() => {
      root = ReactDOM.createRoot(newContainer);
    });
    container = newContainer;
  });

  afterEach(() => {
    if (container == null || root == null) return;
    act(() => {
      if (root == null) return;
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
  });

  it("Should consume stores from context", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <StateContextProvider injectables={[testStore]}>
          <StoreConsumerComponent />
        </StateContextProvider>
      );
    });

    const element = container.querySelector(
      `[data-testid="${STORE_CONSUMER_ID}"]`
    );
    if (element == null) {
      fail();
    }

    expect(element.innerHTML).toBe("100");
  });
});
