import { DecisionTypes } from '../../../meta';
import type { DecisionTypeMeta } from '../../../types';

type DecisionTypeByType = Record<string, DecisionTypeMeta>;

const byType = DecisionTypes.reduce((acc, item) => {
    acc[item.type] = item;
    return acc;
}, {} as DecisionTypeByType);

export const getDecisionTypeMeta = (type: string): DecisionTypeMeta => {
    if (!byType[type]) {
        throw new Error(`Unknow decision type "${type}".`);
    }
    return byType[type];
};
