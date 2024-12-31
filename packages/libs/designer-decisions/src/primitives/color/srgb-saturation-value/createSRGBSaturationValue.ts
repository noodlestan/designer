import type {
    ColorSRGBSaturation,
    DecisionValueContext,
    SRGBSaturationValue,
} from '../../../types';
import { createColorValue } from '../value';

import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: DecisionValueContext,
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
