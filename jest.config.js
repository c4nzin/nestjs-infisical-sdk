module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
      useESM: true
    }
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  rootDir: 'test',
  transformIgnorePatterns: ['node_modules/(?!axios)']
};
