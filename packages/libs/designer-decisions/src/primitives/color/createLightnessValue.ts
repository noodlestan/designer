import type { ColorLightnessInput, LightnessValue, ValueContext } from '../../types';

export const createLightnessValue = (
    context: ValueContext,
    input: ColorLightnessInput,
): LightnessValue => {
    return {
        get: () => Number(input),
    };
};
