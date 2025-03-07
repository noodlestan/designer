// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './applyModelFallback';
export * from './applyNameFallback';
export * from './applyParamsFallback';
export * from './applyUuidFallback';
export * from './types';
