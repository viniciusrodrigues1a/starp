/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { resolve } = require("path");
const { compilerOptions } = require("../tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");
const rootDir = resolve(__dirname);

module.exports = {
  rootDir,
  testMatch: ["<rootDir>/**/*.test.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  displayName: "integration-tests",
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules", "/dist"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/../",
  }),
};
