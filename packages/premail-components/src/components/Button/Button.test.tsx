import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Button, IButtonProps } from "./Button";

const BUTTON_TEST_ID = "button-test-id";

describe("Button tests", () => {
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

    act(() => {
      root?.render(<Button data-testid={BUTTON_TEST_ID}>hello world</Button>);
    });

    const element = container.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.innerHTML).toContain("hello world");
  });

  it("Should default to primary variant.", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(<Button data-testid={BUTTON_TEST_ID}>hello world</Button>);
    });

    const element = container.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.classList).toContain("primary");
  });

  it("Should render all variants.", () => {
    if (!container || !root) fail();
    const variants: IButtonProps["variant"][] = [
      "primary",
      "secondary",
      "outlined",
      "plain",
      "danger",
      "warning",
    ];

    variants.forEach((variantName) => {
      act(() => {
        root?.render(
          <Button data-testid={BUTTON_TEST_ID} variant={variantName}>
            hello world
          </Button>
        );
      });
      const element = container?.querySelector(
        `[data-testid="${BUTTON_TEST_ID}"]`
      );

      if (element == null) fail();

      expect(Array.from(element.classList)).toContain(variantName);
    });
  });
});
