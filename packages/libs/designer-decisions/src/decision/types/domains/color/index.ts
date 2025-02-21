// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './oklab';
export * from './set';
export * from './srgb';
export * from './value';
