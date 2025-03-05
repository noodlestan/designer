// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './color-set';
export * from './color-value';
export * from './oklab';
export * from './srgb';
