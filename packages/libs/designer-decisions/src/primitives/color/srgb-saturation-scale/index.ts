// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './createSRGBSaturationScale';
export * from './isColorSRGBSaturationScaleDecision';
