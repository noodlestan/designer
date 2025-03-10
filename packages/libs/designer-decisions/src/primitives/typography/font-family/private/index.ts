// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './normalizeFontFamilyInput';
export * from './stringifyFontFamily';
export * from './validateFontFamilyName';
