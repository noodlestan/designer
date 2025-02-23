// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './fontWeightFromName';
export * from './fontWeightToOpenTypeName';
export * from './isValidFontWeightName';
