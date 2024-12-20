import type { DecisionModelFactory } from '../../types';

import { getDecisionModelMeta } from './functions';

export const getDecisionModelFactory = <V>(type: string): DecisionModelFactory<V> => {
    const [, modelMeta] = getDecisionModelMeta(type);
    return modelMeta.factory as DecisionModelFactory<V>;
};
