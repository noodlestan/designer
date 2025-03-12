// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './createTextStyleValue';
export * from './resolveTextStyleValue';
export * from './resolveTextStyleValueRef';
