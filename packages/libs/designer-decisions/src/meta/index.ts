import { ColorDecisionTypes, SizeDecisionTypes, TypographyDecisionTypes } from './domains';
import { createDecisionModelMetas, createDecisionTypeMeta } from './functions';

export * from './data';
export * from './schemas';
export * from './types';

export const DECISION_TYPES = [
    ...ColorDecisionTypes,
    ...SizeDecisionTypes,
    ...TypographyDecisionTypes,
];

export const DECISION_TYPE_METAS = DECISION_TYPES.map(createDecisionTypeMeta);
export const DECISION_MODEL_METAS = DECISION_TYPES.flatMap(createDecisionModelMetas);
