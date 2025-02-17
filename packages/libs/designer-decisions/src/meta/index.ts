import { ColorDecisionTypes } from './color';
import { createDecisionModelMetas, createDecisionTypeMeta } from './functions';
import { SpaceDecisionTypes } from './space';

export * from './data';
export * from './types';

export const DECISION_TYPES = [...ColorDecisionTypes, ...SpaceDecisionTypes];

export const DECISION_TYPE_METAS = DECISION_TYPES.map(createDecisionTypeMeta);
export const DECISION_MODEL_METAS = DECISION_TYPES.flatMap(createDecisionModelMetas);
