import type { DecisionModelFactory } from '../models';

import { getDecisionModelMeta } from './private';

export const getDecisionModelFactory = <V>(model: string): DecisionModelFactory<V> => {
    const [, modelMeta] = getDecisionModelMeta(model);
    return modelMeta.factory as DecisionModelFactory<V>;
};
