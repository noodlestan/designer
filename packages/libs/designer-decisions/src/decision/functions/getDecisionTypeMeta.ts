import { DECISION_TYPES, type DecisionType } from '../../meta';
import { UnknownDecisionTypeError } from '../errors';

type DecisionTypeByType = Record<string, DecisionType>;

const byType = DECISION_TYPES.reduce((acc, item) => {
    acc[item.type] = item;
    return acc;
}, {} as DecisionTypeByType);

export const getDecisionTypeMeta = (type: string): DecisionType => {
    if (!byType[type]) {
        throw new UnknownDecisionTypeError(type);
    }
    return byType[type];
};
