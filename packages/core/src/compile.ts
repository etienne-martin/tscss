import clearModule from "clear-module";

import type { CssObject } from "./tscss.def";
import { md5 } from "./utils/md5";
import { remapModule } from "./utils/module";

// eslint-disable-next-line unicorn/prefer-module
const SWC_REGISTER_PATH = require.resolve("@swc/register");

// TODO: pull that from the project
const SWC_CONFIG = {
  module: {
    type: "commonjs",
  },
};

remapModule({
  from: "@tscss/core",
  to: "@tscss/core/dist/compile-css",
});

export const compile = async (filePath: string) => {
  clearModule(filePath);

  const { default: defaultExport, ...namedExports }: { default: Record<string, CssObject> } = eval(
    [
      `require("${SWC_REGISTER_PATH}")(${JSON.stringify(SWC_CONFIG)});`,
      `module.exports = require("${filePath}");`,
    ].join("\n")
  );

  const hasNamedExports = Object.keys(namedExports).length > 0;

  if (!defaultExport) {
    throw new Error("The module doesn't have a default export");
  }

  if (hasNamedExports) {
    // eslint-disable-next-line no-console
    console.warn("Named exports will be ignored");
  }

  let stylesheet = Object.entries(defaultExport)
    .map(([className, { declarations }]) => `.${className} {\n\t${declarations}\n}`)
    .join("\n\n");

  Object.entries(defaultExport).map(([className, { hash }]) => {
    stylesheet = stylesheet.replaceAll(hash, className);
  });

  const stylesheetName = `${md5(stylesheet)}.module.scss`;
  const dependencies = Object.values(defaultExport).map(({ parent }) => parent);

  return {
    stylesheet,
    stylesheetName,
    dependencies,
  };
};
