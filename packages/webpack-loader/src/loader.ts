import { parse, print } from "@swc/core";
import { compile } from "@tscss/core/dist/compile";
import { resolve, dirname } from "node:path";
import type { LoaderDefinitionFunction } from "webpack";

export const loader: LoaderDefinitionFunction = function (content, map, meta) {
  const callback = this.async();

  (async () => {
    const program = await parse(content, {
      syntax: "typescript",
    });

    const hasStyleImports = program.body.some(
      (value) => value.type === "ImportDeclaration" && value.source.value.endsWith(".style")
    );

    if (hasStyleImports) {
      for (const value of program.body) {
        if (value.type === "ImportDeclaration" && value.source.value.endsWith(".style")) {
          const styleImportPath = resolve(dirname(this.resourcePath), value.source.value);
          const { stylesheet, stylesheetName, dependencies } = await compile(styleImportPath);

          // eslint-disable-next-line unicorn/prefer-module
          [require.resolve(styleImportPath), ...dependencies].forEach(
            (dependency) => dependency && this.addDependency(dependency)
          );

          this.emitFile(stylesheetName, stylesheet);
          value.source.raw = `"../${stylesheetName}"`;
        }
      }

      const { code } = await print(program);

      callback(null, code, map, meta);

      return;
    }

    callback(null, content, map, meta);
  })().catch((error) => {
    callback(error, content, map, meta);
  });
};
