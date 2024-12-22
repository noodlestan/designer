import {
    DECISION_TYPES,
    type DecisionType,
    type DecisionTypeModel,
} from '@noodlestan/designer-decisions';

type DecisionTypeAndModelByModel = Record<string, [DecisionType, DecisionTypeModel]>;

const byModel = DECISION_TYPES.reduce((acc, item) => {
    for (const model of item.models) {
        const key = item.type + '/' + model.model;
        acc[key] = [item, { ...model, model: key }];
    }
    return acc;
}, {} as DecisionTypeAndModelByModel);

export const getDecisionModelMeta = (model: string): [DecisionType, DecisionTypeModel] => {
    if (!byModel[model]) {
        throw new Error(`Unknow decision type "${model}".`);
    }
    return byModel[model];
};
