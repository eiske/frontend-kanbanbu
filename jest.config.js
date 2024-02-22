const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    injectGlobals: true,
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jsdom",
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        '^@components(.*)$': '<rootDir>/src/components/$1',
        '^@constants(.*)$': '<rootDir>/src/constants/$1',
        '^@hooks(.*)$': '<rootDir>/src/hooks/$1',
        '^@mocks(.*)$': '<rootDir>/src/__mocks__/$1',
        '^@pages(.*)$': '<rootDir>/src/pages/$1',
        '^@services(.*)$': '<rootDir>/src/services/$1',
        '^@store(.*)$': '<rootDir>/src/store/$1',
        '^@helpers(.*)$': '<rootDir>/src/helpers/$1',
        '^@styles(.*)$': '<rootDir>/src/styles/$1',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
