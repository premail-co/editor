import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import Typography, { TypographyVariant_ENUM } from "./Typography";

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
        <Typography variant={TypographyVariant_ENUM.h1}>
          Typography H1 Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });
  it("should match H2 snapshot", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.h2}>
          Typography H2 Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H3 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.h3}>
          Typography H3 Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H4 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.h4}>
          Typography H4 Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H5 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.h5}>
          Typography H5 Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match H6 snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.h6}>
          Typography H6 Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match p snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.p}>
          Typography p Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should Match Link snapshots", () => {
    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.link}>
          Typography link Variant
        </Typography>
      );
    });
    let tree = container?.innerHTML;
    expect(tree).toMatchSnapshot();
  });

  it("Should render overriding classNames", () => {
    act(() => {
      root?.render(
        <Typography
          variant={TypographyVariant_ENUM.link}
          override={"testClass"}
        >
          Typography link Variant
        </Typography>
      );
    });

    const el = container?.querySelector(
      `[class="${TypographyVariant_ENUM.link} testClass"]`
    );

    expect(el).not.toBeNull();
  });

  it("Should render style objects", () => {
    const style = { color: "red" };

    act(() => {
      root?.render(
        <Typography variant={TypographyVariant_ENUM.link} style={style}>
          Typography link Variant
        </Typography>
      );
    });
    const el = container?.querySelector<HTMLElement>(
      `[class="${TypographyVariant_ENUM.link}"]`
    );

    if (el == null) fail();

    expect(el.style.color).toBe("red");
  });
});
