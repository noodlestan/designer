// @index(['./*.ts', '!./*.spec.ts', './!(private|parts|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './decisionTypeFromModel';
