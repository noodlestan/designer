// @index(['./*.ts', '!./*.spec.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './isColorSet';
export * from './isColorValue';
export * from './isOklabChromaScale';
export * from './isOklabChromaValue';
export * from './isOklabHueSet';
export * from './isOklabHueValue';
export * from './isOklabLightnessScale';
export * from './isOklabLightnessValue';
export * from './isSRGBHueSet';
export * from './isSRGBHueValue';
export * from './isSRGBLightnessScale';
export * from './isSRGBLightnessValue';
export * from './isSRGBSaturationScale';
export * from './isSRGBSaturationValue';
