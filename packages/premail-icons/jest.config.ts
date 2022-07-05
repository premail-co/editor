/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  moduleNameMapper: {
    "\\.svg": "<rootDir>/src/__mocks__/svgMock.tsx",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  testEnvironment: "jsdom",
  setupFiles: ["./testSetup.ts"],
};
