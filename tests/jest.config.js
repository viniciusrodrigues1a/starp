/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  displayName: "integration-tests",
  clearMocks: true,
  testPathIgnorePatterns: ["/node_modules", "/dist"],
};
