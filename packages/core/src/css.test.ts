import { expectType } from "tsd";

import { css } from "./css";

describe("css", () => {
  it("should throw an error when using the `css` tag at runtime", () => {
    expect(
      () => css`
        background: red;
      `
    ).toThrow("Using the `css` tag at runtime is not supported.");
  });

  describe("typescript", () => {
    // eslint-disable-next-line jest/expect-expect
    it("should return a string type", async () => {
      try {
        expectType<string>(css``);
      } catch {
        // Ignore runtime error
      }
    });
  });
});
