module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier", "import", "unicorn", "forbid-filename"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {},
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    "unicorn/require-post-message-target-origin": 2,
    "unicorn/prefer-string-replace-all": 2,
    "unicorn/no-unused-properties": 2,
    "unicorn/custom-error-definition": 2,
    "unicorn/no-unsafe-regex": 2,
    "unicorn/prefer-event-target": 0,
    "unicorn/consistent-function-scoping": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/no-null": 0,
    "unicorn/no-array-for-each": 0,
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],

    "@typescript-eslint/no-non-null-assertion": 2,
    "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
    "@typescript-eslint/prefer-optional-chain": 2,
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": true,
        "ts-ignore": true,
        "ts-nocheck": true,
        "ts-check": false,
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
        enums: true,
        typedefs: true,
      },
    ],

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["strictCamelCase", "StrictPascalCase", "snake_case"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      {
        selector: ["enum", "enumMember", "typeLike"],
        format: ["StrictPascalCase"],
        leadingUnderscore: "allow",
      },
      {
        // Allows destructured properties to retain their original name
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
      },
      {
        // Removes the convention for property names that requires quoting (for example, HTTP headers)
        selector: "default",
        format: null,
        modifiers: ["requiresQuotes"],
      },
    ],

    "forbid-filename/match": ["error", { patterns: [/\.d\.ts$/], ignores: [] }],
    camelcase: "off",
    radix: 2,
    "object-shorthand": 2,
    complexity: ["error", { max: 7 }],
    eqeqeq: 2,
    curly: ["error", "multi-line"],
    "no-return-await": 2,
    "no-console": 1,
    "prefer-arrow-callback": 2,
    "func-style": ["error", "expression", { allowArrowFunctions: true }],

    "padding-line-between-statements": [
      "error",
      // Start off by requiring padding between every statement
      { blankLine: "always", prev: "*", next: "*" },
      // Let the `import/order` rule manage padding between imports
      { blankLine: "any", prev: ["import"], next: ["import"] },
      // Group single line constants together
      {
        blankLine: "never",
        prev: ["singleline-const", "singleline-let"],
        next: ["singleline-const", "singleline-let"],
      },
      // Require padding after require statements
      { blankLine: "always", prev: ["cjs-import"], next: "*" },
      // Let the `import/order` rule manage padding between require statements
      { blankLine: "any", prev: ["cjs-import"], next: ["cjs-import"] },
      // Group single line expressions together
      { blankLine: "never", prev: ["expression"], next: ["expression"] },
      // Require padding between multiline expressions
      { blankLine: "always", prev: "*", next: ["multiline-expression"] },
      { blankLine: "always", prev: ["multiline-expression"], next: "*" },
      // Group if statements together
      { blankLine: "never", prev: ["if"], next: ["if"] },
      // Require padding between multiline block statements (includes multiline if statements)
      { blankLine: "always", prev: "*", next: ["block", "multiline-block-like"] },
      { blankLine: "always", prev: ["block", "multiline-block-like"], next: "*" },
    ],
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      // Require padding between interfaces and types
      { blankLine: "always", prev: "*", next: ["interface", "type"] },
    ],

    // TODO: find a rule to enforce the use of `.includes()` over `.indexOf()`

    "import/no-duplicates": 2,
    "import/first": 2,
    "import/no-cycle": 2,
    "import/no-self-import": 2,
    "import/no-useless-path-segments": 2,
    "import/no-namespace": 2,
    "import/no-default-export": 2,
    "import/order": [
      2,
      {
        groups: [["builtin", "external"], "internal", ["parent", "index", "sibling"]],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ["builtin"],
        pathGroups: [
          {
            pattern: "*.mock", // Mocks must be imported first
            patternOptions: { matchBase: true },
            group: "builtin",
            position: "before",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": 0,
        "unicorn/prefer-module": 0,
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx", "*.mock.ts", "*.mock.tsx"],
      rules: {
        "@typescript-eslint/consistent-type-assertions": 0,
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      plugins: ["jest"],
      extends: ["plugin:jest/all"],
      rules: {
        "jest/unbound-method": 0,
        "jest/no-hooks": 0,
        "jest/prefer-expect-assertions": 0,
        "jest/prefer-mock-promise-shorthand": 0,
        "jest/consistent-test-it": ["error", { fn: "test", withinDescribe: "it" }],
        "jest/prefer-lowercase-title": 0,
        "jest/valid-title": [
          "error",
          {
            mustNotMatch: ["\\.$", "Titles should not end with a full-stop"],
            mustMatch: {
              it: [
                /^should /u.source,
                `test titles must start with "should", and be followed by a short description of the expected behavior.`,
              ],
            },
          },
        ],
      },
    },
  ],
};
