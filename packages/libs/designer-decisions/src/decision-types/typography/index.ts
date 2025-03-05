// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isFontSizeValueDecision';
export * from './isFontWeightValueDecision';
export * from './isTypefaceValueDecision';
export * from './types';
