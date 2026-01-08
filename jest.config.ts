import type { Config as SwcConfig } from '@swc/core';
import type { Config as JestConfig } from 'jest';

const swcCongfig: SwcConfig = {
  jsc: {
    parser: { syntax: 'typescript', tsx: false },
    target: 'es2022',
  },
  module: { type: 'es6' },
  sourceMaps: 'inline',
};

const config: JestConfig = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: [ '.ts', '.mts' ],
  transform: {
    '^.+\\.[cm]?[jt]sx?$': [ '@swc/jest', swcCongfig ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@faker-js/faker/)',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.(js|mjs|cjs)$': '$1',
  },
  setupFiles: [
    '<rootDir>/jest.env.ts',
  ],
};

export default config;
