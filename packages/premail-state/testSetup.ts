import "setimmediate";
import { mockDeep } from "jest-mock-extended";
import type { createServiceLogger } from "@premail/logger";
import dotenv from "dotenv";
import { resolve } from "path";

jest.mock("@premail/logger", () => {
  return {
    createServiceLogger: () =>
      mockDeep<ReturnType<typeof createServiceLogger>>(),
  };
});

// Enable ReactDOM act for unit testing
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Implement jest failure function
global.fail = (reason: string) => {
  throw new Error(reason);
};

// Implement jest failure function
dotenv.config({ path: resolve(__dirname, "./config.env.test") });
