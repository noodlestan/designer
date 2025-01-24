import type {
    DecisionValueContext,
    OklabLightnessScale,
    OklabLightnessValue,
} from '../../../types';

export const createOklabLightnessScale = (
    context: DecisionValueContext,
    input: OklabLightnessValue[],
): OklabLightnessScale => {
    context.consume(input);

    return {
        get: () => input,
    };
};
