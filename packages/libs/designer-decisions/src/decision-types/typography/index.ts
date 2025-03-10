// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isFontFamilyValueDecision';
export * from './isFontSizeValueDecision';
export * from './isFontWeightValueDecision';
export * from './isLetterSpacingValueDecision';
export * from './isLineHeightValueDecision';
export * from './isTypefaceValueDecision';
export * from './types';
