import React from "react";
import ReactDOM from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { Autocomplete } from "./Autocomplete";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("AutocompleteStory Test", () => {
  let container: HTMLElement | null = document.createElement("div");
  let root: ReactDOM.Root | null = null;
  beforeEach(() => {
    jest.clearAllMocks();
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
  it("It Should render with pane hidden and empty buffer when Focus is off", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();
    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[{ label: "hello", value: 1 }]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector(`.paneExpanded`);
    const input = container.querySelector<HTMLInputElement>("input");
    expect(input?.value).toBe("");
    expect(el).toBe(null);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("It Should render options when Focus is on", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLLabelElement>(`#test-autocomplete`);

    if (!el) {
      fail();
    }
    act(() => {
      el.focus();
    });

    const paneContainer = container.querySelector(`.paneExpanded`);

    if (!paneContainer) {
      fail();
    }

    const list = paneContainer.querySelectorAll("li");
    const input = container.querySelector<HTMLInputElement>("input");

    expect(list.length).toBe(2);
    expect(input?.value).toBe("");
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("It should trigger callback on selection", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLLabelElement>(`#test-autocomplete`);
    const el2 = container.querySelector<HTMLLabelElement>(`[id="hello - 1"]`);
    if (!el || !el2) {
      fail();
    }

    act(() => {
      el.focus();
      el2.click();
    });

    const paneContainer = container.querySelector(`.paneExpanded`);

    const input = container.querySelector<HTMLInputElement>("input");

    expect(paneContainer).toBe(null);
    expect(input?.value).toBe("hello");
    expect(onSelect).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("It should triger a callback when option is unselected", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLLabelElement>(`#test-autocomplete`);
    const el2 = container.querySelector<HTMLLabelElement>(`[id="hello - 1"]`);
    if (!el || !el2) {
      fail();
    }

    act(() => {
      el.focus();
    });

    act(() => {
      el2.click();
    });
    const input = container.querySelector<HTMLInputElement>("input");

    act(() => {
      container?.click();
      el.blur();
    });

    act(() => {
      el.focus();
    });

    const paneContainer = container.querySelector(`.paneExpanded`);

    expect(paneContainer).not.toBe(null);
    expect(input?.value).toBe("");
    expect(onSelect).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it("It should select an option with keyboard", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLLabelElement>(`#test-autocomplete`);
    if (!el) {
      fail();
    }

    act(() => {
      el.focus();
    });
    act(() => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));
    });
    act(() => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    const input = container.querySelector<HTMLInputElement>("input");

    // const paneContainer = container.querySelector(`.paneExpanded`);

    // expect(paneContainer).toBe(null);
    expect(input?.value).toBe("hello");
    expect(onSelect).toHaveBeenCalledWith({ label: "hello", value: 1 });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("It should circle back to the beggining of the list when pressing key down", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLLabelElement>(`#test-autocomplete`);
    if (!el) {
      fail();
    }

    act(() => {
      el.focus();
    });
    act(() => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Down" }));
    });

    act(() => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    const input = container.querySelector<HTMLInputElement>("input");

    expect(input?.value).toBe("hello");
    expect(onSelect).toHaveBeenCalledWith({ label: "hello", value: 1 });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("It should circle back to the beggining of the list when pressing key up", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLLabelElement>(`#test-autocomplete`);
    if (!el) {
      fail();
    }

    act(() => {
      el.focus();
    });
    act(() => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Up" }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Up" }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Up" }));
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Up" }));
    });

    act(() => {
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    const input = container.querySelector<HTMLInputElement>("input");

    expect(input?.value).toBe("world");
    expect(onSelect).toHaveBeenCalledWith({ label: "world", value: 2 });
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("It should filter options", () => {
    if (!container || !root) fail();
    const onSelect = jest.fn();

    const App = () => {
      return (
        <Autocomplete
          id="test-autocomplete"
          options={[
            { label: "hello", value: 1 },
            { label: "world", value: 2 },
          ]}
          selectedOption={null}
          noMatchLabel={"no match"}
          onSelection={onSelect}
        />
      );
    };

    act(() => {
      root?.render(<App />);
    });

    const el = container.querySelector<HTMLInputElement>(`input`);
    if (!el) {
      fail();
    }

    act(() => {
      Simulate.focus(el);
      el.value = "hello";
      Simulate.change(el);
    });

    expect(el.value).toBe("hello");
    expect(document.querySelectorAll("li").length).toBe(1);

    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});
