const { compile } = require("@tscss/core/dist/compile");
const { deepEqual, rejects } = require("node:assert");
const { resolve } = require("node:path");
const { describe, it } = require("node:test");

describe("compile", () => {
  it("should compile the module", async () => {
    const fixturePath = resolve(__dirname, "./fixtures/default-export.style.ts");

    deepEqual(await compile(fixturePath), {
      stylesheet: ".container {\n\tbackground: #09f;\n}",
      stylesheetName: "840f89cb2356f6dc43fc6909eff55350.module.scss",
    });
  });

  it("should log a warning if the module has named exports", async () => {
    const fixturePath = resolve(__dirname, "./fixtures/named-export.style.ts");

    await compile(fixturePath);
    // TODO: assert the console warning
  });

  it("should throw an error if the module doesn't have a default export", async () => {
    const fixturePath = resolve(__dirname, "./fixtures/no-default-export.style.ts");

    await rejects(compile(fixturePath), new Error("The module doesn't have a default export"));
  });
});
