import { getDecisionModelMeta } from './functions';

export const getDecisionModelDecisionType = (model: string): string => {
    const [decisionMeta] = getDecisionModelMeta(model);
    return decisionMeta.type;
};
