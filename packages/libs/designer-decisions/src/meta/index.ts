// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
import { ColorDecisionTypes } from './color';
import { SpaceDecisionTypes } from './space';

export * from './color';
export * from './space';

export const DecisionTypes = [...ColorDecisionTypes, ...SpaceDecisionTypes];
