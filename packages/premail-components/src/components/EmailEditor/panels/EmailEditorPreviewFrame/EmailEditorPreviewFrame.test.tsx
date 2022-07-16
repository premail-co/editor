import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { EmailPreviewFrame } from "./EmailEditorPreviewFrame";

const testRenderContents = "hello world";
const testRenderContainerId = "hello world";
const frametestid = "frame-test-id";

describe("EmailEditorPreviewFrame tests", () => {
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

  it("Should render the foundation boilerplate as template", () => {
    if (!container || !root) fail();

    act(() => {
      root?.render(
        <EmailPreviewFrame id={frametestid}>
          <div data-testid={testRenderContainerId}>{testRenderContents}</div>
        </EmailPreviewFrame>
      );
    });

    const frame = document.querySelector<HTMLIFrameElement>(
      `[id="${frametestid}"]`
    );

    if (!frame) {
      fail();
    }

    const renderedContent = frame.contentDocument?.querySelector(
      `[data-testid="${testRenderContainerId}"]`
    );

    if (!renderedContent) fail();

    expect(renderedContent.innerHTML).toBe(testRenderContents);
  });
});
