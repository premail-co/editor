import { hello } from "./index";

describe("Index tests", () => {
  it("should say hello", () => {
    expect(hello()).toBe("hello");
  });
});
