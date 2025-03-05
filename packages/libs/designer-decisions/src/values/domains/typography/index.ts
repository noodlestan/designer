// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './font-size-value';
export * from './font-weight-value';
export * from './typeface-value';
export * from './types';
