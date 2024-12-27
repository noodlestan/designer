import type { ColorSaturationInput, SaturationValue, ValueContext } from '../../../types';
import { createColorValue } from '../value';

import { resolveSaturationValue } from './resolveLightnessValue';

export const createSaturationValue = (
    context: ValueContext,
    input: ColorSaturationInput,
): SaturationValue => {
    const value = resolveSaturationValue(context, input);

    return {
        get: () => value,
        getColor: components => {
            const { h, l } = components;
            return createColorValue(context, { h, s: value, l });
        },
    };
};
