import type { DecisionValueContext, OklabHueSet, OklabHueValue } from '../../../types';

export const createOklabHueSet = (
    context: DecisionValueContext,
    input: OklabHueValue[],
): OklabHueSet => {
    context.consume(input);

    return {
        get: () => input,
    };
};
