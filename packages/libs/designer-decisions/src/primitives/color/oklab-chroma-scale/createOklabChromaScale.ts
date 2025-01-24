import type { DecisionValueContext, OklabChromaScale, OklabChromaValue } from '../../../types';

export const createOklabChromaScale = (
    context: DecisionValueContext,
    input: OklabChromaValue[],
): OklabChromaScale => {
    context.consume(input);

    return {
        get: () => input,
    };
};
