// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './srgb-hue-set';
export * from './srgb-hue-value';
export * from './srgb-lightness-scale';
export * from './srgb-lightness-value';
export * from './srgb-saturation-scale';
export * from './srgb-saturation-value';
