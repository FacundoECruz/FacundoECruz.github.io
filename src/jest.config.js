// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js"
  ],
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
}