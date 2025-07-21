// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/**/*.test.js'
    ],
    coverageThreshold: {
      global: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85
      }
    },
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js'
    ],
    moduleFileExtensions: ['js', 'json'],
    verbose: true
  };