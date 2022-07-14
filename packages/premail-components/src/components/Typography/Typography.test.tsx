import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Typography } from "./Typography";
const testId = "typography-id";

describe("Typography tests", () => {
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

  it("Should Match H1 Snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={"h1"}>Typography H1 Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });
  it("should match H2 snapshot", () => {
    act(() => {
      root?.render(
        <Typography variant={"h2"}>Typography H2 Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H3 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={"h3"}>Typography H3 Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H4 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={"h4"}>Typography H4 Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H5 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={"h5"}>Typography H5 Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H6 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={"h6"}>Typography H6 Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match p snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"}>Typography p Variant</Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should render overriding classNames", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} override={"testClass"}>
          Typography link Variant
        </Typography>
      );
    });

    const el = container?.querySelectorAll(`[class="testClass"]`);

    expect(el).not.toBeNull();
  });

  it("Should render style objects", () => {
    const style = { color: "red" };

    act(() => {
      root?.render(
        <Typography variant={"p1"} style={style} id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.style.color).toBe("red");
  });

  it("Should render the bold class", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} bold id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(Array.from(el.classList)).toContain("bold");
  });

  it("Should render the italic class", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} italic id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(Array.from(el.classList)).toContain("italic");
  });

  it("Should render the link class", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} link id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(Array.from(el.classList)).toContain("link");
  });

  it("Should render the strikethrough class", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} strikethrough id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(Array.from(el.classList)).toContain("strikethrough");
  });

  it("Should render the disableMargins  class", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} disableMargins id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(Array.from(el.classList)).toContain("disableMargins");
  });

  it("Should render the 'p' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant={"p1"} id={testId} renderElement="p">
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("p");
  });

  it("Should render the 'h1' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="h1" renderElement="h1" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("h1");
  });

  it("Should render the 'h2' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="h2" renderElement="h2" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("h2");
  });

  it("Should render the 'h3' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="h3" renderElement="h3" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("h3");
  });

  it("Should render the 'h4' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="h4" renderElement="h4" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("h4");
  });

  it("Should render the 'h5' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="h5" renderElement="h5" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("h5");
  });

  it("Should render the 'h6' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="h6" renderElement="h6" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("h6");
  });

  it("Should render the 'span' renderElement", () => {
    act(() => {
      root?.render(
        <Typography variant="p1" renderElement="span" id={testId}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(`[id="${testId}"]`);

    if (el == null) fail();

    expect(el.tagName.toLowerCase()).toBe("span");
  });
});
