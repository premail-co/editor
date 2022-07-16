import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { IInputRef, Input } from "./Input";
describe("Input Test", () => {
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

  it("Should render the input component", () => {
    if (!root || !container) fail();
    act(() => {
      root?.render(<Input type="text" id="test-input" />);
    });
  });

  it("Should forward label and input refs", () => {
    if (!root || !container) fail();

    const Root = () => {
      const ref = React.useRef<IInputRef | null>(null);

      React.useEffect(() => {
        ref.current?.input?.classList.add("input");
        ref.current?.wrapper?.classList.add("label");
      });
      return <Input type="text" id="test-input" ref={ref} />;
    };
    act(() => {
      root?.render(<Root />);
    });
    const input = container.querySelector("input");
    const label = container.querySelector("label");
    if (!input || !label) fail();
    expect(Array.from(input.classList)).toContain("input");
    expect(Array.from(label.classList)).toContain("label");
  });

  it("Should render override classnames", () => {
    if (!root || !container) fail();

    const Root = () => {
      return <Input type="text" id="test-input" override={"override"} />;
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(Array.from(label.classList)).toContain("override");
  });

  it("Should render disabled styles", () => {
    if (!root || !container) fail();

    const Root = () => {
      return <Input type="text" id="test-input" disabled />;
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(Array.from(label.classList)).toContain("rootDisabled");
  });

  it("Should render error styles", () => {
    if (!root || !container) fail();

    const Root = () => {
      return <Input type="text" id="test-input" error />;
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(Array.from(label.classList)).toContain("rootError");
  });

  it("Should render helperText styles", () => {
    if (!root || !container) fail();

    const Root = () => {
      return <Input type="text" id="test-input" helperText={"hello world"} />;
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(Array.from(label.classList)).toContain("rootHelperText");
  });

  it("Should render icons by default to at the beginning of inline block", () => {
    if (!root || !container) fail();

    const Icon = () => {
      return <span id="icon">icon</span>;
    };

    const Root = () => {
      return (
        <Input
          type="text"
          id="test-input"
          helperText={"hello world"}
          icon={Icon}
        />
      );
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(label.children[0].id).toBe("icon");
  });
  it("Should render icons by at the beginning of inline block when iconPosition is begin", () => {
    if (!root || !container) fail();

    const Icon = () => {
      return <span id="icon">icon</span>;
    };

    const Root = () => {
      return (
        <Input
          type="text"
          id="test-input"
          helperText={"hello world"}
          icon={Icon}
          iconPosition="begin"
        />
      );
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(label.children[0].id).toBe("icon");
  });

  it("Should render icons by at the end of inline block when iconPosition is end", () => {
    if (!root || !container) fail();

    const Icon = () => {
      return <span id="icon">icon</span>;
    };

    const Root = () => {
      return (
        <Input
          type="text"
          id="test-input"
          helperText={"hello world"}
          icon={Icon}
          iconPosition="end"
        />
      );
    };
    act(() => {
      root?.render(<Root />);
    });
    const label = container.querySelector("label");
    if (!label) fail();
    expect(label.children[0].id).not.toBe("icon");
    expect(label.children[1].id).toBe("icon");
  });

  // it("Should render disabled styles", () => {
  //   if (!root || !container) fail();

  //   const Root = () => {
  //     return <Input type="text" id="test-input" override={"override"} />;
  //   };
  //   act(() => {
  //     root?.render(<Root />);
  //   });
  //   const label = container.querySelector("label");
  //   if (!label) fail();
  //   expect(Array.from(label.classList)).toContain("override");
  // });
});
