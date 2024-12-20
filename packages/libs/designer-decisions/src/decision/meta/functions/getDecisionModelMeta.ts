import { DecisionTypes } from '../../../meta';
import type { DecisionModelMeta, DecisionTypeMeta } from '../../../types';

type DecisionTypeByModel = Record<string, [DecisionTypeMeta, DecisionModelMeta]>;

const byModel = DecisionTypes.reduce((acc, item) => {
    for (const model of item.models) {
        const key = item.type + '/' + model.model;
        acc[key] = [item, { type: key, ...model }];
    }
    return acc;
}, {} as DecisionTypeByModel);

export const getDecisionModelMeta = (model: string): [DecisionTypeMeta, DecisionModelMeta] => {
    if (!byModel[model]) {
        throw new Error(`Unknow decision type "${model}".`);
    }
    return byModel[model];
};
