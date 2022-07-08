import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { createObservable } from "../state/Observable";
import { createStoreId, Store } from "../state/Store";
import { StateContextProvider } from "./StateContextProvider";
import { useStore } from "./useStore";

const STORE_CONSUMER_ID = "store-consumer-testid";

class TestStore extends Store {
  valueobservable = createObservable(100);
  constructor() {
    super();
    this.register(this.valueobservable);
  }
}
const testStore = createStoreId({ class: TestStore });

const StoreConsumerComponent = () => {
  const store = useStore(testStore);
  return (
    <div data-testid={STORE_CONSUMER_ID}>
      {store && store.valueobservable.instance.getValue()}
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
        <StateContextProvider stores={[testStore]}>
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
