/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[j|t]s[x]?$": "babel-jest",
  },
};

module.exports = config;
