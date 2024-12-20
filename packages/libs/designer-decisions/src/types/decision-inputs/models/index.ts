import type { ColorDecisionInput } from './color';
import type { SpaceDecisionInput } from './space';

// @index(['./*.{ts,tsx}', './!(private|parts|functions)*/index.{ts,tsx}'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './base';
export * from './color';
export * from './space';
// @endindex

export type DecisionInput = ColorDecisionInput | SpaceDecisionInput;
