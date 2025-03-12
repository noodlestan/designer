// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './font-family';
export * from './font-size';
export * from './font-weight';
export * from './letter-spacing';
export * from './line-height';
export * from './text-style';
export * from './typeface';
