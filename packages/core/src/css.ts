type Css = (strings: TemplateStringsArray, ...values: (string | number)[]) => string;

export const css: Css = () => {
  throw new Error("Using the `css` tag at runtime is not supported.");
};
