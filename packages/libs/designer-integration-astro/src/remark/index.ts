// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}.js';`)
export * from './remarkCollectPermalinks.js';
export * from './remarkInjectStore.js';
