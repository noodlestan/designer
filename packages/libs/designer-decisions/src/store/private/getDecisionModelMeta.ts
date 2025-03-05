import { UnknownDecisionModelError } from '../../decision-context';
import { DECISION_TYPES, type DecisionType, type DecisionTypeModel } from '../../meta';

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
        throw new UnknownDecisionModelError(model);
    }
    return byModel[model];
};
