import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { DashboardTemplate } from "./DashboardTemplate";

const contentTestID = "content-test-id";
const renderedInnerContent = "hello world";

describe("DahboardTemplate tests", () => {
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
  it("Should Render Header Content", () => {
    if (!root || !container) fail();
    act(() => {
      root?.render(
        <DashboardTemplate
          headerContents={
            <div data-testid={contentTestID}>{renderedInnerContent}</div>
          }
        />
      );
    });
    const renderedContent = container.querySelector(
      `[data-testid="${contentTestID}"]`
    );

    if (!renderedContent) {
      fail();
    }

    expect(renderedContent.innerHTML).toBe(renderedInnerContent);
  });

  it("Should Render previewArea content", () => {
    if (!root || !container) fail();
    act(() => {
      root?.render(
        <DashboardTemplate
          previewArea={
            <div data-testid={contentTestID}>{renderedInnerContent}</div>
          }
        />
      );
    });
    const renderedContent = container.querySelector(
      `[data-testid="${contentTestID}"]`
    );

    if (!renderedContent) {
      fail();
    }

    expect(renderedContent.innerHTML).toBe(renderedInnerContent);
  });

  it("Should Render toolbar content", () => {
    if (!root || !container) fail();
    act(() => {
      root?.render(
        <DashboardTemplate
          toolbar={
            <div data-testid={contentTestID}>{renderedInnerContent}</div>
          }
        />
      );
    });
    const renderedContent = container.querySelector(
      `[data-testid="${contentTestID}"]`
    );

    if (!renderedContent) {
      fail();
    }

    expect(renderedContent.innerHTML).toBe(renderedInnerContent);
  });
});
