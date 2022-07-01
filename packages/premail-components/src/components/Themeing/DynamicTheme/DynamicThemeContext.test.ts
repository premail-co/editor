import React from "react";
import { IDynamicThemeContext } from "./types";

describe("DynamicThemeContext tests", () => {
  let DynamicThemeContext!: React.Context<IDynamicThemeContext>;
  let defaultValues!: IDynamicThemeContext;

  const RealContext: React.Context<null> = jest
    .requireActual("react")
    .createContext(null);

  const mockCreateContext = jest.fn(() => RealContext);

  beforeAll(() => {
    jest.mock("react", () => ({
      createContext: mockCreateContext,
    }));
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    DynamicThemeContext = require("./DynamicThemeContext").DynamicThemeContext;
    defaultValues = require("./DynamicThemeContext").defaultValues;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a context instance with default values", () => {
    expect(mockCreateContext).toHaveBeenCalled();
    expect(DynamicThemeContext).toBe(RealContext);
  });
  it("Match default values snapshot", () => {
    expect(defaultValues).toMatchInlineSnapshot(`
      Object {
        "setTheme": [Function],
        "theme": null,
      }
    `);
  });
});
