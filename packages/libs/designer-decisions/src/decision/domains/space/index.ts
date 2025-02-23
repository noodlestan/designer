// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isSizeScaleDecision';
export * from './isSizeValueDecision';
export * from './types';
