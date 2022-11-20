import { css } from "./compile-css";

describe("css compilation", () => {
  it("should return a css object", () => {
    expect(
      css`
        background: red;
      `
    ).toStrictEqual({
      object: "tscss-object",
      hash: "tscss_8d56b4d4328d9b516c27754b2b8bd9b5",
      declarations: "background: red;",
    });
  });

  it("should interpolate strings", () => {
    expect(
      css`
        background: ${"blue"};
      `
    ).toStrictEqual({
      object: "tscss-object",
      hash: "tscss_b7e2bb17e6595b273084e4949026f076",
      declarations: "background: blue;",
    });
  });

  it("should interpolate numbers", () => {
    expect(
      css`
        width: ${100}px;
      `
    ).toStrictEqual({
      object: "tscss-object",
      hash: "tscss_e3d221c579a286e5afeab8e4e848093b",
      declarations: "width: 100px;",
    });
  });

  it("should interpolate nested objects", () => {
    const nested = css`
      background: green;
    `;

    expect(
      css`
        background: red;

        .${nested} {
          background: blue;
        }
      `
    ).toStrictEqual({
      object: "tscss-object",
      hash: "tscss_1cf1f6e870576ea3e7d92ef91ee2a80d",
      declarations: `background: red;\n\n        .${nested.hash} {\n          background: blue;\n        }`,
    });
  });
});
