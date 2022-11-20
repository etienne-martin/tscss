import crypto from "node:crypto";

export const md5 = (input: string) => {
  return crypto.createHash("md5").update(input).digest("hex");
};
