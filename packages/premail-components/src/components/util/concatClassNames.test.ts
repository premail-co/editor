import { concatClassNames } from "./concatClassNames";

describe("concatClassNames tests", () => {
  it("Should return empty string when called with no classNames", () => {
    expect(concatClassNames()).toBe("");
  });

  it("Should return className when called with one className", () => {
    expect(concatClassNames("hello")).toBe("hello");
  });

  it("Should merge more than one className", () => {
    expect(concatClassNames("hello", "world")).toBe("hello world");
  });

  it("Should trim className strings", () => {
    expect(concatClassNames("  hello  ", "  world ")).toBe("hello world");
  });

  it("Should remove empty strings", () => {
    expect(concatClassNames("  hello  ", "  world ")).toBe("hello world");
  });

  it("Should remove empty strings", () => {
    expect(concatClassNames("    ", " ", "")).toBe("");
  });
});
