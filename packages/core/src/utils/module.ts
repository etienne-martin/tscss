export const remapModule = ({ from, to }: { from: string; to: string }) => {
  // eslint-disable-next-line unicorn/prefer-module
  require(to);
  // eslint-disable-next-line unicorn/prefer-module
  require.cache[require.resolve(from)] = require.cache[require.resolve(to)];
};
