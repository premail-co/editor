import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { StaticThemeContextProvider } from "./StaticThemeContextProvider";
import { ConsumerThemeDisplay, ConsumerThemeToggle } from "./test-util";

describe("StaticThemeProvider tests", () => {
  let container: HTMLElement | null = null;
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
    const renderTestString = "hello world";
    const renderElementId = "test_id";
    if (container == null) fail();
    act(() => {
      root?.render(
        <StaticThemeContextProvider>
          <div id={renderElementId}>{renderTestString}</div>
        </StaticThemeContextProvider>
      );
    });
    const renderedElement = container.querySelector(`#${renderElementId}`);
    if (renderedElement == null)
      fail("Test string was not found in the container");
    expect(renderedElement.innerHTML).toBe(renderTestString);
  });

  it("Should not apply a className if a value is not provided on mount", () => {
    if (root == null) fail();
    act(() => {
      root?.render(<StaticThemeContextProvider></StaticThemeContextProvider>);
    });
    expect(Array.from(document.body.classList)).toHaveLength(0);
    act(() => {
      root?.unmount();
    });
    expect(Array.from(document.body.classList)).toHaveLength(0);
  });

  it("Should apply a theme classname to document.body on mount and remove on unmount", () => {
    if (root == null) fail();
    const themeName = "TEST_THEME";
    act(() => {
      root?.render(
        <StaticThemeContextProvider
          initialTheme={{ name: themeName }}
        ></StaticThemeContextProvider>
      );
    });
    expect(Array.from(document.body.classList)).toContain(themeName);
    act(() => {
      root?.unmount();
    });
    expect(Array.from(document.body.classList)).not.toContain(themeName);
  });

  it("Should update a theme classname from document.body on themeing context updates", () => {
    if (container == null || root == null) fail();
    const initialThemeName = "TEST_THEME_1";
    const updatedThemeName = "TEST_THEME_2";
    const themeChangeButtonId = "theme-changer-id";
    const buttonInnerText = "Click me";

    expect(initialThemeName).not.toBe(updatedThemeName);

    act(() => {
      root?.render(
        <StaticThemeContextProvider initialTheme={{ name: initialThemeName }}>
          <ConsumerThemeToggle
            buttonInnerText={buttonInnerText}
            nameToUpdate={updatedThemeName}
            testId={themeChangeButtonId}
          />
        </StaticThemeContextProvider>
      );
    });

    expect(Array.from(document.body.classList)).toContain(initialThemeName);
    const button = container.querySelector<HTMLButtonElement>(
      `button[data-testid='${themeChangeButtonId}']`
    );
    if (!button) fail();

    act(() => {
      button.click();
    });

    expect(Array.from(document.body.classList)).not.toContain(initialThemeName);
    expect(Array.from(document.body.classList)).toContain(updatedThemeName);
  });

  it("Should provide consumers with initial theme value of undefined  ", () => {
    if (container == null || root == null) fail();
    const themeNameContainerId = "theme-name-container-id";
    const placeholderText = "NO THEME SET";

    act(() => {
      if (!root) fail();
      root.render(
        <StaticThemeContextProvider>
          <ConsumerThemeDisplay themeNameContainerId={themeNameContainerId} />
        </StaticThemeContextProvider>
      );
    });
    expect(Array.from(document.body.classList)).toHaveLength(0);
    const themeNameContainer = container.querySelector<HTMLDivElement>(
      `div[data-testid='${themeNameContainerId}']`
    );
    expect(themeNameContainer?.innerHTML).toBe(placeholderText);
  });
});
