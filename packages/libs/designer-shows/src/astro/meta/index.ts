// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './getColorVizComponent';
export * from './getDecisionComponent';
export * from './getSpaceVizComponent';
