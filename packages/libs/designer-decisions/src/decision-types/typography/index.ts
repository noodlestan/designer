// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isFontFamilyValue';
export * from './isFontSizeValue';
export * from './isFontWeightValue';
export * from './isLetterSpacingValue';
export * from './isLineHeightValue';
export * from './isTextStyleValue';
export * from './isTypefaceValue';
