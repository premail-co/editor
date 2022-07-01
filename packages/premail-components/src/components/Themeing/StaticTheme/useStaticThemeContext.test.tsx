import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { StaticThemeContextProvider } from "./StaticThemeContextProvider";
import {
  ConsumerThemeDisplay,
  ConsumerThemeToggle,
  NO_THEME_PLACEHOLDER_TEXT,
} from "./test-util";

describe("useStaticThemeContext tests", () => {
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

  it("Should render default values with no matching provider  ", () => {
    if (container == null || root == null) fail();
    const updatedThemeName = "TEST_THEME_2";
    const themeChangeButtonId = "theme-changer-id";
    const buttonInnerText = "Click me";
    const themeNameContainerId = "theme-display-id";

    act(() => {
      if (!root) fail();
      root.render(
        <ConsumerThemeToggle
          buttonInnerText={buttonInnerText}
          nameToUpdate={updatedThemeName}
          testId={themeChangeButtonId}
        />
      );
    });
    const button = container.querySelector<HTMLButtonElement>(
      `button[data-testid='${themeChangeButtonId}']`
    );

    // assert button is mounted
    if (!button) fail();

    act(() => {
      button.click();
    });

    expect(Array.from(document.body.classList)).not.toContain(updatedThemeName);

    act(() => {
      if (!root) fail();
      root.render(
        <ConsumerThemeDisplay themeNameContainerId={themeNameContainerId} />
      );
    });
    const displayContainer = container.querySelector<HTMLDivElement>(
      `[data-testid='${themeNameContainerId}']`
    );
    expect(displayContainer?.innerHTML).toBe(NO_THEME_PLACEHOLDER_TEXT);
  });

  it("Should consume updated theme values  ", () => {
    if (container == null || root == null) fail();
    const initialThemeName = "TEST_THEME_1";
    const updatedThemeName = "TEST_THEME_2";
    const themeChangeButtonId = "theme-changer-id";
    const buttonInnerText = "Click me";
    const themeNameContainerId = "theme-display-id";

    // assert theme names aren't equal
    expect(initialThemeName).not.toBe(updatedThemeName);

    act(() => {
      if (!root) fail();
      root.render(
        <StaticThemeContextProvider initialTheme={{ name: initialThemeName }}>
          <ConsumerThemeToggle
            buttonInnerText={buttonInnerText}
            nameToUpdate={updatedThemeName}
            testId={themeChangeButtonId}
          />
          <ConsumerThemeDisplay themeNameContainerId={themeNameContainerId} />
        </StaticThemeContextProvider>
      );
    });
    const button = container.querySelector<HTMLButtonElement>(
      `button[data-testid='${themeChangeButtonId}']`
    );
    const displayContainer = container.querySelector<HTMLDivElement>(
      `div[data-testid='${themeNameContainerId}']`
    );
    // assert consumers mounted
    if (!button || !displayContainer) {
      fail();
    }
    // assert display consumer renders initial theme name
    expect(displayContainer?.innerHTML).not.toBe(NO_THEME_PLACEHOLDER_TEXT);
    expect(displayContainer?.innerHTML).toBe(initialThemeName);

    act(() => {
      button.click();
    });

    // assert display consumer renders updated theme name
    expect(displayContainer?.innerHTML).not.toBe(NO_THEME_PLACEHOLDER_TEXT);
    expect(displayContainer?.innerHTML).not.toBe(initialThemeName);
    expect(displayContainer?.innerHTML).toBe(updatedThemeName);
  });
});
