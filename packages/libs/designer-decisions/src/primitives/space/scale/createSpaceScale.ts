import type { DecisionValueContext, SpaceScale, SpaceValue } from '../../../types';

export const createSpaceScale = (
    context: DecisionValueContext,
    values: SpaceValue[],
): SpaceScale => {
    return {
        get: () => values,
    };
};
