// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './createInterpolatedNumberSeries';
export * from './createNumberSteppedSeries';
export * from './generateSeriesValue';
