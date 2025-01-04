import type {
    DecisionValueContext,
    OklabLightnessScale,
    OklabLightnessValue,
} from '../../../types';

export const createOklabLightnessScale = (
    context: DecisionValueContext,
    values: OklabLightnessValue[],
): OklabLightnessScale => {
    return {
        get: () => values,
    };
};
