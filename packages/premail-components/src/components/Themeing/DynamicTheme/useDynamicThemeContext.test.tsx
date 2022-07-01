import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { useDynamicThemeContext } from "./useDynamicThemeContext";
import { DynamicThemeContextProvider } from "./DynamicThemeContextProvider";
import { DynamicTheme } from "./types";

const NO_THEME_PLACEHOLDER = "NO_THEME";
const THEME_NAME_DISPLAY_TEST_ID = "THEME_NAME_DISPLAY_TEST_ID";
const TOGGLE_THEME_TEST_ID = "TOGGLE_THEME_TEST_ID";

const DisplayThemeName = () => {
  const themeContext = useDynamicThemeContext();

  return (
    <div data-testid={THEME_NAME_DISPLAY_TEST_ID}>
      {themeContext.theme != null
        ? JSON.stringify(themeContext.theme)
        : NO_THEME_PLACEHOLDER}
    </div>
  );
};

const TOGGLED_THEME: DynamicTheme = {
  name: "toggled",
  values: { hello: "world" },
};

const INITIAL_THEME: DynamicTheme = {
  name: "initial",
  values: { a: "b" },
};

const ToggleThemeValue = () => {
  const themeContext = useDynamicThemeContext();
  return (
    <button
      data-testid={TOGGLE_THEME_TEST_ID}
      onClick={() => {
        themeContext.setTheme(TOGGLED_THEME);
      }}
    >
      click me
    </button>
  );
};

describe("useDynamicThemeContext Test", () => {
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

  it("Should consume default values with no provider", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <>
          <DisplayThemeName />
          <ToggleThemeValue />
        </>
      );
    });

    const content = document.querySelector(
      `[data-testid='${THEME_NAME_DISPLAY_TEST_ID}']`
    );
    if (!content) fail();

    expect(content.innerHTML).toBe(NO_THEME_PLACEHOLDER);

    const toggle = document.querySelector<HTMLButtonElement>(
      `[data-testid='${TOGGLE_THEME_TEST_ID}']`
    );
    if (!toggle) fail();

    act(() => {
      toggle.click();
    });
    expect(content.innerHTML).toBe(NO_THEME_PLACEHOLDER);
    expect(document.querySelector("style")).toBe(null);
  });

  it("Should consume updated values from context provider ", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <DynamicThemeContextProvider initialTheme={INITIAL_THEME}>
          <DisplayThemeName />
          <ToggleThemeValue />
        </DynamicThemeContextProvider>
      );
    });
    const content = document.querySelector(
      `[data-testid='${THEME_NAME_DISPLAY_TEST_ID}']`
    );
    if (!content) fail();
    expect(content.innerHTML).toBe(JSON.stringify(INITIAL_THEME));

    const toggle = document.querySelector<HTMLButtonElement>(
      `[data-testid='${TOGGLE_THEME_TEST_ID}']`
    );
    if (!toggle) fail();

    act(() => {
      toggle.click();
    });
    expect(content.innerHTML).toBe(JSON.stringify(TOGGLED_THEME));
    expect(content.innerHTML).not.toBe(JSON.stringify(INITIAL_THEME));
  });
});
