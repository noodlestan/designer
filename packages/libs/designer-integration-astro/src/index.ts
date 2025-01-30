import { designerDecisionsIntegration } from './integration';
// @index(['./*.ts', '!./*.test.ts', './!(private|mocks|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './integration';
// @endindex

export default designerDecisionsIntegration;
