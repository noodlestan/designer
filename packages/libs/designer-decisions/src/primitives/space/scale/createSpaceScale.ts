import type { DecisionValueContext, SpaceScale, SpaceValue } from '../../../types';

export const createSpaceScale = (
    context: DecisionValueContext,
    input: SpaceValue[],
): SpaceScale => {
    context.consume(input);

    return {
        get: () => input,
    };
};
