import type {
    ColorSRGBSaturationInput,
    ColorchannelOptions,
    SRGBSaturationValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveSRGBSaturationValue } from './resolveSRGBSaturationValue';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
    options: ColorchannelOptions = {},
): SRGBSaturationValue => {
    context.consume(input);

    const { precision } = options;
    const value = resolveSRGBSaturationValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => nearest(value, precision),
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, s: value, l });
        },
    };
};
