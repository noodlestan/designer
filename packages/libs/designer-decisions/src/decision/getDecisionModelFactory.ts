import type { DecisionModelFactory } from '../models';

import { getDecisionModelMeta } from './functions';

export const getDecisionModelFactory = <V>(model: string): DecisionModelFactory<V> => {
    const [, modelMeta] = getDecisionModelMeta(model);
    return modelMeta.factory as DecisionModelFactory<V>;
};
