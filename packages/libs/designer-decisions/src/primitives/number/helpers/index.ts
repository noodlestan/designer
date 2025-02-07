// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './clamped';
export * from './generateAnchoredSeries';
export * from './generateBoundedSeries';
export * from './generateNumberSeries';
export * from './nearest';
