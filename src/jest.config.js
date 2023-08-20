// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ['./jest.setup.js'],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.ts"
  ],
}