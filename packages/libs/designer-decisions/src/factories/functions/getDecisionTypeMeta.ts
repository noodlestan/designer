import { DECISION_TYPES } from '../../meta';
import type { DecisionType } from '../../types';

type DecisionTypeByType = Record<string, DecisionType>;

const byType = DECISION_TYPES.reduce((acc, item) => {
    acc[item.type] = item;
    return acc;
}, {} as DecisionTypeByType);

export const getDecisionTypeMeta = (type: string): DecisionType => {
    if (!byType[type]) {
        throw new Error(`Unknow decision type "${type}".`);
    }
    return byType[type];
};
