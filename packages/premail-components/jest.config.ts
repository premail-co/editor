/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/src/__mocks__/svgMock.ts",
    "\\.png": "<rootDir>/src/__mocks__/pngMock.ts",
  },
  testEnvironment: "jsdom",
  setupFiles: ["./testSetup.ts"],
};
