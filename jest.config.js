const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  coverageReporters: "json", 
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html', 'text'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/swagger/',
    '/swagger-jsdoc/',
    '/routes/'
  ],
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage', 'swagger', 'swagger-jsdoc', 'routes'],
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testTimeout: 30000,
  detectOpenHandles: true,
  forceExit: true,
  verbose: true,
  transform: {
    ...tsJestTransformCfg,
  },
  setupFiles: ['dotenv/config'],
  clearMocks: true,
  testEnvironmentOptions: {
    "beforeDestroy": "async () => { await new Promise(resolve => setTimeout(resolve, 1000)); }"
  }
};