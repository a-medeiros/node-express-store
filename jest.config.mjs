/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',

  // ESM + TypeScript via ts-jest
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
  },

  // Tell Jest to treat .ts as ESM
  extensionsToTreatAsEsm: ['.ts'],

  // Allow omitting ".js" in ESM local imports compiled by TS NodeNext
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },

  clearMocks: true,
  verbose: true,
};
