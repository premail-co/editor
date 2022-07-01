import React from "react";
import { IStaticThemeContext } from "./types";

describe("StaticThemeContext tests", () => {
  let StaticThemeContext!: React.Context<IStaticThemeContext>;
  let defaultValues!: IStaticThemeContext;

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
    StaticThemeContext = require("./StaticThemeContext").StaticThemeContext;
    defaultValues = require("./StaticThemeContext").defaultValues;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a context instance with default values", () => {
    expect(mockCreateContext).toHaveBeenCalled();
    expect(StaticThemeContext).toBe(RealContext);
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
