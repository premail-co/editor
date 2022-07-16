import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Surface } from "./Surface";

const SURFACE_TEST_ID = "surface-test-id";
describe("Surface tests", () => {
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
    const content = "Hello world";
    act(() => {
      root?.render(<Surface id={SURFACE_TEST_ID}>{content}</Surface>);
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(element.innerHTML).toBe(content);
  });

  it("Should render surface elevations", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Surface id={SURFACE_TEST_ID} elevation="elevation-1">
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain("elevation-1");
  });

  it("Should render surface borders", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Surface border id={SURFACE_TEST_ID} elevation="elevation-1">
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain("border");
  });

  it("Should render class overrides", () => {
    const content = "Hello world";
    const override = "test-override";
    act(() => {
      root?.render(
        <Surface
          border
          id={SURFACE_TEST_ID}
          elevation="elevation-1"
          override={override}
        >
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain(override);
  });

  it("Should disable logical css borders: border block end", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Surface
          border={{ disableBorderBlockEnd: true }}
          id={SURFACE_TEST_ID}
          elevation="elevation-1"
        >
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain("disable-border-block-end");
  });

  it("Should disable logical css borders: border block start", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Surface
          border={{ disableBorderBlockStart: true }}
          id={SURFACE_TEST_ID}
          elevation="elevation-1"
        >
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain(
      "disable-border-block-start"
    );
  });

  it("Should disable logical css borders: border inline start", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Surface
          border={{ disableBorderInlineStart: true }}
          id={SURFACE_TEST_ID}
          elevation="elevation-1"
        >
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain(
      "disable-border-inline-start"
    );
  });

  it("Should disable logical css borders: border inline end", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Surface
          border={{ disableBorderInlineEnd: true }}
          id={SURFACE_TEST_ID}
          elevation="elevation-1"
        >
          {content}
        </Surface>
      );
    });
    const element = container?.querySelector(`[id="${SURFACE_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain(
      "disable-border-inline-end"
    );
  });
});
