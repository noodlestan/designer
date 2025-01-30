import type { ColorSRGBSaturationInput, SRGBSaturationValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
): SRGBSaturationValue => {
    context.consume(input);

    const value = resolveSRGBSaturationValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => value,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, s: value, l });
        },
    };
};
