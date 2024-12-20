import type { ColorLightnessInput, LightnessScale, ValueContext } from '../../types';

import { createLightnessValue } from './createLightnessValue';

export const createLightnessScale = (
    context: ValueContext,
    input: ColorLightnessInput[],
): LightnessScale => {
    return {
        get: () => input.map(item => createLightnessValue(context, item)),
    };
};
