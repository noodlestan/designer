// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './applyUuidFallback';
export * from './applyModelFallback';
export * from './applyNameFallback';
export * from './applyParamsFallback';
