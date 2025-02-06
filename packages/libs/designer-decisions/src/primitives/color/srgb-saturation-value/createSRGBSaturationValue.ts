import type { ColorSRGBSaturationInput, SRGBSaturationValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
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
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, s: value, l });
        },
    };
};
