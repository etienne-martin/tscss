const path = require("node:path");

module.exports = {
  root: true,
  extends: ["@tscss/eslint-config-tscss"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: [path.resolve(__dirname, "./packages/**/tsconfig.json")],
      },
    },
  },
  ignorePatterns: ["node_modules", "dist", "coverage"],
  rules: {},
};
