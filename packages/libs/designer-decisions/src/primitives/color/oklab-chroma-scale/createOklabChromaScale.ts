import type { DecisionValueContext, OklabChromaScale, OklabChromaValue } from '../../../types';

export const createOklabChromaScale = (
    context: DecisionValueContext,
    values: OklabChromaValue[],
): OklabChromaScale => {
    return {
        get: () => values,
    };
};
