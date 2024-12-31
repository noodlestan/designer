import type { ColorSRGBSaturation, SRGBSaturationValue, ValueContext } from '../../../types';
import { createColorValue } from '../value';

import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturation,
): SRGBSaturationValue => {
    const value = resolveSRGBSaturationValue(context, input);

    return {
        get: () => value,
        toColor: components => {
            const { h, l } = components;
            return createColorValue(context, { h, s: value, l });
        },
    };
};
