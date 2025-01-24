import type {
    ColorSRGBSaturation,
    DecisionValueContext,
    SRGBSaturationValue,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: DecisionValueContext,
    input: ColorSRGBSaturation,
): SRGBSaturationValue => {
    context.consume(input);

    const value = resolveSRGBSaturationValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: components => {
            const { h, l } = components;
            return createColorValue(context.outputContext(), { h, s: value, l });
        },
    };
};
