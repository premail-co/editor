import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { createDefinition } from "../index";
import { Store } from "../state/Store";
import { StateContextProvider } from "./StateContextProvider";

describe("StateContextProvider tests", () => {
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

  it("Should render children", () => {
    if (!container || !root) fail();
    const renderTestId = "test-render-children-id";
    const renderedText = "Hello world";

    act(() => {
      root?.render(
        <StateContextProvider injectables={[]}>
          <div data-testid={renderTestId}>{renderedText}</div>
        </StateContextProvider>
      );
    });

    const element = container.querySelector(`[data-testid='${renderTestId}']`);
    // Assert Provider children mounted
    if (element == null) fail(`Text not found in container`);
    expect(element.innerHTML).toBe(renderedText);
  });

  it("Should instantiate provided stores", () => {
    if (!container || !root) fail();
    const spy = jest.fn();
    class TestStore extends Store {
      onInstanceCreated = spy;
    }

    const storeDefinition = createDefinition({ class: TestStore });

    act(() => {
      root?.render(
        <StateContextProvider injectables={[storeDefinition]}>
          <div>hello</div>
        </StateContextProvider>
      );
    });

    expect(spy).toHaveBeenCalled();
  });

  it("Should swap stores", () => {
    if (!container || !root) fail();
    const spy1 = jest.fn();
    const cleanUp = jest.fn();
    const spy2 = jest.fn();
    class TestStore1 extends Store {
      onInstanceCreated = spy1;
      cleanUp = cleanUp;
    }
    class TestStore2 extends Store {
      onInstanceCreated = spy2;
    }

    const storeDefinition1 = createDefinition({
      class: TestStore1,
      name: "TestStore1",
    });
    const storeDefinition2 = createDefinition({
      class: TestStore2,
      name: "TestStore2",
    });

    const App = () => {
      const [injectables, setInjectables] = React.useState<any[]>([
        storeDefinition1,
      ]);
      return (
        <StateContextProvider injectables={injectables}>
          <button
            data-testid="inject-button"
            onClick={() => {
              setInjectables([storeDefinition2]);
            }}
          >
            add stores
          </button>
        </StateContextProvider>
      );
    };

    act(() => {
      root?.render(<App />);
    });
    expect(spy1).toHaveBeenCalled();

    const el = container.querySelector<HTMLButtonElement>(
      `[data-testid="inject-button"]`
    );
    if (!el) {
      fail();
    }
    act(() => {
      el.click();
    });

    expect(cleanUp).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
