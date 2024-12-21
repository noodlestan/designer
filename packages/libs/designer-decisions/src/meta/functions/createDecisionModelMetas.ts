import type { DecisionModelMeta, DecisionType } from '../../types';

export const createDecisionModelMetas = (decisionType: DecisionType): DecisionModelMeta[] => {
    const { type, category, domain } = decisionType;
    return decisionType.models.map(decisionModel => {
        const { model, name, description } = decisionModel;
        return {
            model: `${type}/${model}`,
            type,
            name,
            category,
            domain,
            description,
        };
    });
};
