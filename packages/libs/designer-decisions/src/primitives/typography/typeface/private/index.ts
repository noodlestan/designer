// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from '../constants';
export * from './isTypefaceCapability';
export * from './normalizeTypefaceInput';
export * from './validateCapabilities';
export * from './validateFontName';
