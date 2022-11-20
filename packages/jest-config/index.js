const path = require("node:path");

const swcBaseConfig = require("../../.swcrc.json");

const swcConfig = {
  ...swcBaseConfig,
  exclude: [],
  module: {
    ...swcBaseConfig.module,
    /**
     * Jest's support for ECMAScript Modules and dynamic imports is still experimental,
     * so we need to disable them during test execution.
     */
    ignoreDynamic: false,
  },
};

module.exports = (config = {}) => {
  return {
    verbose: true,
    collectCoverage: true,
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      url: "http://localhost/",
    },
    ...config,
    transform: {
      "^.+\\.(js|ts)x?$": ["@swc/jest", swcConfig],
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    coveragePathIgnorePatterns: ["/node_modules/", "/coverage/", "/tests/", "/dist/"],
    coverageThreshold: {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    testMatch: ["**/?(*.)(test).{ts,tsx}"],
    collectCoverageFrom: ["./src/**/*.{ts,tsx}", "!./src/**/*.mock.{ts,tsx}"],
    setupFilesAfterEnv: [path.resolve(__dirname, "./jest.setup.ts"), ...(config.setupFilesAfterEnv ?? [])],
  };
};
