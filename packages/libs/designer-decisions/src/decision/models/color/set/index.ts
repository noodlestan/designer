// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './constants';
export * from './createColorSetExplicit';
export * from './createColorSetLinearRange';
export * from './createColorSetModifier';
export * from './isColorSetDecision';
