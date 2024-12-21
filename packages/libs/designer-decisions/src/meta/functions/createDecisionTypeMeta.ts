import type { DecisionType, DecisionTypeMeta } from '../../types';

export const createDecisionTypeMeta = (decisionType: DecisionType): DecisionTypeMeta => {
    const { type, name, category, domain, models, ...rest } = decisionType;
    return {
        type,
        name,
        category,
        domain,
        ...rest,
        models: models.map(decisionModel => {
            const { model, name, description } = decisionModel;
            return {
                model: `${type}/${model}`,
                type,
                name,
                category,
                domain,
                description,
            };
        }),
    };
};
