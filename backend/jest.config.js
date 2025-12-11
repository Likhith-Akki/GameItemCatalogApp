export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src/tests'],
  testMatch: ['**/*.test.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['dotenv/config'],
}