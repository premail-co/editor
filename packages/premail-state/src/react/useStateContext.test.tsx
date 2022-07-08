import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { createObservable } from "../state/Observable";
import { createStoreId, Store } from "../state/Store";
import { StateContextProvider } from "./StateContextProvider";
import { useStateContext } from "./useStateContext";

const STORE_CONSUMER_TEST_ID = "store-consumer-test-id";

class TestStore extends Store {
  observable = createObservable(100);

  constructor() {
    super();
    this.register(this.observable);
  }
}
const store = createStoreId({ class: TestStore });

const ConsumeState = () => {
  const stateContext = useStateContext();

  if (stateContext.storeRegisty == null) {
    return <div data-testid={STORE_CONSUMER_TEST_ID}>null registry</div>;
  }
  return <div data-testid={STORE_CONSUMER_TEST_ID}>hello world</div>;
};

const ConsumeState2 = () => {
  const stateContext = useStateContext();

  const comsumedStore =
    stateContext.storeRegisty &&
    stateContext.storeRegisty.lookup<TestStore>(store.id);

  if (comsumedStore == null)
    return <div data-testid={STORE_CONSUMER_TEST_ID}>no stores found</div>;

  return (
    <div data-testid={STORE_CONSUMER_TEST_ID}>
      {comsumedStore.observable.instance.getValue()}
    </div>
  );
};

describe("useStoreContext tests", () => {
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

  it("Shoud consume default values with no provider", () => {
    if (!container || !root) fail();
    act(() => {
      root?.render(
        <>
          <ConsumeState />
        </>
      );
    });
    const element = container.querySelector(
      `[data-testid="${STORE_CONSUMER_TEST_ID}"]`
    );
    expect(element?.innerHTML).toBe("null registry");
  });
  it("Shoud consume store registry and store values", () => {
    if (!container || !root) fail();
    act(() => {
      root?.render(
        <StateContextProvider stores={[store]}>
          <ConsumeState2 />
        </StateContextProvider>
      );
    });
    const element = container.querySelector(
      `[data-testid="${STORE_CONSUMER_TEST_ID}"]`
    );
    expect(element?.innerHTML).toBe("100");
  });
});
