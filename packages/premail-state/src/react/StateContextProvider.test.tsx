import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { createStoreId, Store } from "../state/Store";
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
        <StateContextProvider stores={[]}>
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
      constructor() {
        super();
        spy();
      }
    }
    const storeid = createStoreId({ class: TestStore });

    act(() => {
      root?.render(
        <StateContextProvider stores={[storeid]}>
          <div>hello</div>
        </StateContextProvider>
      );
    });

    expect(spy).toHaveBeenCalled();
  });
});
