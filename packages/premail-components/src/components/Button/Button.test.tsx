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
      root?.render(
        <Button>
          <span data-testid={BUTTON_TEST_ID}>hello world</span>
        </Button>
      );
    });

    const element = container.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.innerHTML).toBe("hello world");
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

  it("Should render all sizes.", () => {
    if (!container || !root) fail();
    const sizes: IButtonProps["size"][] = ["small", "medium", "large"];

    sizes.forEach((sizeName) => {
      act(() => {
        root?.render(
          <Button data-testid={BUTTON_TEST_ID} size={sizeName}>
            hello world
          </Button>
        );
      });
      const element = container?.querySelector(
        `[data-testid="${BUTTON_TEST_ID}"]`
      );

      if (element == null) fail();

      expect(Array.from(element.classList)).toContain(sizeName);
    });
  });

  it("Should render class overrides.", () => {
    if (!container || !root) fail();
    const overrideClassName = "override";

    act(() => {
      root?.render(
        <Button data-testid={BUTTON_TEST_ID} override={overrideClassName}>
          hello world
        </Button>
      );
    });
    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(Array.from(element.classList)).toContain(overrideClassName);
  });

  it("Should default to primary variant with unknown variant strings.", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        //@ts-ignore
        <Button data-testid={BUTTON_TEST_ID} variant={"invalid_variant"}>
          hello world
        </Button>
      );
    });
    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(Array.from(element.classList)).toContain("primary");
  });

  it("Should render icons.", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <Button
          icon={() => <span data-testid={BUTTON_TEST_ID}>hello world</span>}
        />
      );
    });

    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.innerHTML).toBe("hello world");
  });

  it("Should render icons.", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <Button
          icon={() => <span data-testid={BUTTON_TEST_ID}>hello world</span>}
        />
      );
    });

    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.innerHTML).toBe("hello world");
  });

  it("Should render icons before the content text by default", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <Button
          data-testid={BUTTON_TEST_ID}
          icon={() => <span>hello world icon</span>}
        >
          <span>hello world</span>
        </Button>
      );
    });

    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.children[0].innerHTML).toBe("hello world icon");
  });

  it("Should render icons before the content text if position is begin", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <Button
          iconPosition="begin"
          data-testid={BUTTON_TEST_ID}
          icon={() => <span>hello world icon</span>}
        >
          <span>hello world</span>
        </Button>
      );
    });

    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.children[0].innerHTML).toBe("hello world icon");
  });

  it("Should render icons after the content if position is end", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <Button
          data-testid={BUTTON_TEST_ID}
          iconPosition="end"
          icon={() => <span>hello world icon</span>}
        >
          <span>hello world</span>
        </Button>
      );
    });

    const element = container?.querySelector(
      `[data-testid="${BUTTON_TEST_ID}"]`
    );

    if (element == null) fail();

    expect(element.children[element.children.length - 1].innerHTML).toBe(
      "hello world icon"
    );
  });
});
