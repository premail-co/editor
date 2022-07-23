import React from "react";
import { IStateContext } from "./types";

describe("StateContext tests", () => {
  let StateContext!: React.Context<IStateContext>;
  let defaultValues!: IStateContext;

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
    StateContext = require("./StateContext").StateContext;
    defaultValues = require("./StateContext").defaultValues;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a context instance with default values", () => {
    expect(mockCreateContext).toHaveBeenCalled();
    expect(StateContext).toBe(RealContext);
  });
  it("Match default values snapshot", () => {
    expect(defaultValues).toMatchInlineSnapshot(`
      Object {
        "instanceManager": null,
      }
    `);
  });
});
