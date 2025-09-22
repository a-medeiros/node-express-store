/** @type {import('jest').Config} */
export default {
  testEnvironment: "node",

  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },

  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },

  clearMocks: true,
  verbose: true,
}
