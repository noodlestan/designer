import type { ColorSRGBHueInput, SRGBHueValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveSRGBHueValue } from './resolveSRGBHueValue';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
): SRGBHueValue => {
    context.consume(input);

    const value = resolveSRGBHueValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: channels => {
            const { s, l } = channels;
            return createColorValue(context.outputContext(), { h: value, s, l });
        },
    };
};
