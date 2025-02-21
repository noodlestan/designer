// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './deleteValue';
export * from './extractErrorAttributes';
export * from './extractValue';
export * from './fallbacks';
export * from './maybeValidateRecord';
export * from './normalizeRecord';
export * from './validateRecord';
