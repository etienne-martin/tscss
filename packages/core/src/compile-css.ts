import parentModule from "parent-module";

import type { CssObject } from "./tscss.def";
import { md5 } from "./utils/md5";

const isObject = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};

const isCssObject = (value: unknown): value is CssObject => {
  return isObject(value) && value.object === "tscss-object";
};

export const css = (strings: TemplateStringsArray, ...values: (string | number | CssObject)[]): CssObject => {
  const stringValues = values.map((value) => {
    if (isCssObject(value)) return value.hash;

    return value.toString();
  });

  const declarations = String.raw({ raw: strings }, ...stringValues).trim();
  const hash = md5(declarations);

  return {
    object: "tscss-object",
    hash: `tscss_${hash}`,
    declarations,
    parent: parentModule(),
  };
};
