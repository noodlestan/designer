// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './base';
export * from './color';
export * from './number';
export * from './ref';
export * from './set';
export * from './space';
export * from './type';
export * from './types';
