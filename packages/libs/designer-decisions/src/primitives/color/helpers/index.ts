// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './createColor';
export * from './generateAnchoredColorList';
export * from './generateBoundedColorList';
