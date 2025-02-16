// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}.js';`)
export * from './createDesignerIntegrationAPI.js';
export * from './types.js';
