// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './color';
export * from './number';
export * from './set';
export * from './space';
export * from './typography';
export * from './units';
