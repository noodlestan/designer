// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './color';
export * from './contexts';
export * from './numbers';
export * from './space';
export * from './usage';
