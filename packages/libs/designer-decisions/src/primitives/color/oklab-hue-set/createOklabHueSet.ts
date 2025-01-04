import type { DecisionValueContext, OklabHueSet, OklabHueValue } from '../../../types';

export const createOklabHueSet = (
    context: DecisionValueContext,
    values: OklabHueValue[],
): OklabHueSet => {
    return {
        get: () => values,
    };
};
