// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './font-family-value';
export * from './font-size-value';
export * from './font-weight-value';
export * from './letter-spacing-value';
export * from './line-height-value';
export * from './text-style-value';
export * from './typeface-value';
export * from './types';
