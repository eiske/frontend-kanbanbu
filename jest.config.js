const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    silent: true,
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: [".ts"],
    rootDir: ".",
    modulePaths: ["<rootDir>"],
    moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/src/components/$1",
        "^@constants(.*)$": "<rootDir>/src/constants/$1",
        "^@hooks(.*)$": "<rootDir>/src/hooks/$1",
        "^@pages(.*)$": "<rootDir>/src/pages/$1",
        "^@services(.*)$": "<rootDir>/src/services/$1",
        "^@store(.*)$": "<rootDir>/src/store/$1",
        "^@styles(.*)$": "<rootDir>/src/styles/$1",
    },
    coverageDirectory: "coverage",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
