import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { themeingClassName } from "./constants";
import { DynamicThemeContextProvider } from "./DynamicThemeContextProvider";

describe("DynamicThemeContextProvider tests", () => {
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
        <DynamicThemeContextProvider>
          <div data-testid={renderTestId}>{renderedText}</div>
        </DynamicThemeContextProvider>
      );
    });

    const element = container.querySelector(`[data-testid='${renderTestId}']`);
    // Assert Provider children mounted
    if (element == null) fail(`Text not found in container`);
    expect(element.innerHTML).toBe(renderedText);
  });

  it("Should add a themeing classname to document.body on mount and remove on unmount", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(<DynamicThemeContextProvider></DynamicThemeContextProvider>);
    });

    // Assert themeingClassName has been applied to the body after mount
    expect(Array.from(document.body.classList)).toContain(themeingClassName);

    act(() => {
      root?.unmount();
    });

    // Assert themeingClassName has been removed from body after unmount
    expect(Array.from(document.body.classList)).not.toContain(
      themeingClassName
    );
  });

  it("Should add a style tag classname to document.head on mount and remove on unmount", () => {
    if (!container || !root) fail();
    const styleNodeId = "test-style-node-id";
    act(() => {
      root?.render(
        <DynamicThemeContextProvider
          styleNodeId={styleNodeId}
          initialTheme={{
            name: "test-theme",
            values: { "--backdrop-background-color": "#fff" },
          }}
        ></DynamicThemeContextProvider>
      );
    });

    const style = document.querySelector<HTMLStyleElement>(
      `[id='${styleNodeId}']`
    );
    // Assert style tag has id after mount
    if (!style) {
      fail();
    }

    // Assert themeingClassName has been applied to the style tag
    expect(style.innerHTML).toStrictEqual(
      expect.stringContaining(themeingClassName)
    );
    act(() => {
      root?.unmount();
    });

    const styleAfterMount = document.querySelector<HTMLStyleElement>(
      `[id='${styleNodeId}']`
    );

    // Assert Style node is removed after unmount and contents emptied
    expect(styleAfterMount).toBeNull();
    expect(document.contains(style)).toBe(false);
    expect(style.innerHTML).toStrictEqual("");
  });

  it("Should render and update provided ids to the themeing style tag", () => {
    if (!container || !root) fail();
    const initialID = "ID_ONE";
    const updatedID = "ID_TWO";
    const buttonTestId = "button-testid";
    const App = () => {
      const [id, setId] = React.useState(initialID);
      return (
        <DynamicThemeContextProvider styleNodeId={id}>
          <button
            data-testid={buttonTestId}
            onClick={React.useCallback(() => {
              setId(updatedID);
            }, [setId])}
          >
            Click here
          </button>
        </DynamicThemeContextProvider>
      );
    };
    act(() => {
      root?.render(<App />);
    });
    const style = document.querySelector<HTMLStyleElement>(
      `[id='${initialID}']`
    );
    // Assert that style tag is found
    if (!style) fail(`Style tag not found with initial id`);

    const button = document.querySelector<HTMLButtonElement>(
      `[data-testid='${buttonTestId}']`
    );

    // Assert that style tag is found
    if (!button) fail(`Button tag not found with data-testid`);

    act(() => {
      button.click();
    });

    const style2 = document.querySelector<HTMLStyleElement>(
      `[id='${updatedID}']`
    );

    // Assert that style tag is found with the new id
    if (!style2) fail(`Style tag not found with initial id`);

    // Assert that Context provider updates the passed id
    expect(style.id).not.toBe(initialID);
    expect(style.id).toBe(updatedID);
    expect(style2).toBe(style);
  });
});
