// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './generateAnchoredSeries';
export * from './generateBoundedSeries';
export * from './generateModifierSeries';
