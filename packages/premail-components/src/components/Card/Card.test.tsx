import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Card } from "./Card";

const CARD_TEST_ID = "card-test-id";
describe("Card tests", () => {
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
      root?.render(<Card id={CARD_TEST_ID}>{content}</Card>);
    });
    const element = container?.querySelector(`[id="${CARD_TEST_ID}"]`);
    if (element == null) fail();
    expect(element.innerHTML).toBe(content);
  });

  it("Should render card elevations", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Card id={CARD_TEST_ID} elevation="elevation-1">
          {content}
        </Card>
      );
    });
    const element = container?.querySelector(`[id="${CARD_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain("elevation-1");
  });

  it("Should render card borders", () => {
    const content = "Hello world";
    act(() => {
      root?.render(
        <Card border id={CARD_TEST_ID} elevation="elevation-1">
          {content}
        </Card>
      );
    });
    const element = container?.querySelector(`[id="${CARD_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain("border");
  });

  it("Should render class overrides", () => {
    const content = "Hello world";
    const override = "test-override";
    act(() => {
      root?.render(
        <Card
          border
          id={CARD_TEST_ID}
          elevation="elevation-1"
          override={override}
        >
          {content}
        </Card>
      );
    });
    const element = container?.querySelector(`[id="${CARD_TEST_ID}"]`);
    if (element == null) fail();
    expect(Array.from(element.classList)).toContain(override);
  });
});
