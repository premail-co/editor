import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { createDefinition } from "../index";
import { Observable } from "../state/Observable";
import { Store } from "../state/Store";
import { StateContextProvider } from "./StateContextProvider";
import { useObservable } from "./useObservable";
import { useInjectable } from "./useInjectable";

class TestStore extends Store {
  likes = new Observable(100);

  cleanUp = () => {
    this.likes.clearSubscribers();
  };
}

const testStore = createDefinition({ class: TestStore });

const OBSERVABLE_DISPLAY_ID = "display-id";
const OBSERVABLE_MUTATOR_ID = "mutatir-id";

const ObservableDisplay = () => {
  const store = useInjectable(testStore);
  const [value] = useObservable(store?.likes ?? null);

  return <div data-testid={OBSERVABLE_DISPLAY_ID}>{value}</div>;
};

const ObservableMutator = () => {
  const store = useInjectable(testStore);
  const [value, setValue] = useObservable(store?.likes ?? null);
  const parsedValue = value ?? 0;

  return (
    <button
      data-testid={OBSERVABLE_MUTATOR_ID}
      onClick={() => {
        setValue(parsedValue + 1);
      }}
    >
      click to increase likes
    </button>
  );
};

describe("useObservable tests", () => {
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

  it("Should consume an observable from the context", () => {
    if (!container || !root) {
      fail();
    }
    act(() => {
      root?.render(
        <StateContextProvider injectables={[testStore]}>
          <ObservableDisplay />
          <ObservableMutator />
        </StateContextProvider>
      );
    });

    const displayElement = container.querySelector(
      `[data-testid="${OBSERVABLE_DISPLAY_ID}"]`
    );

    const mutatorElement = container.querySelector<HTMLButtonElement>(
      `[data-testid="${OBSERVABLE_MUTATOR_ID}"]`
    );

    if (!displayElement || !mutatorElement) {
      fail();
    }
    expect(displayElement.innerHTML).toBe("100");

    act(() => {
      mutatorElement.click();
    });

    expect(displayElement.innerHTML).toBe("101");
  });

  it("Should should return null if no context provider is found", () => {
    if (!container || !root) {
      fail();
    }
    act(() => {
      root?.render(
        <>
          <ObservableDisplay />
          <ObservableMutator />
        </>
      );
    });

    const displayElement = container.querySelector(
      `[data-testid="${OBSERVABLE_DISPLAY_ID}"]`
    );

    const mutatorElement = container.querySelector<HTMLButtonElement>(
      `[data-testid="${OBSERVABLE_MUTATOR_ID}"]`
    );

    if (!displayElement || !mutatorElement) {
      fail();
    }
    expect(displayElement.innerHTML).toBe("");

    act(() => {
      mutatorElement.click();
    });

    expect(displayElement.innerHTML).toBe("");
  });
});
