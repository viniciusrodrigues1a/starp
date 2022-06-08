/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  displayName: "unit-tests",
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules", "/dist", "/tests"],
};
