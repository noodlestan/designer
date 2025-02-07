import type {
    ColorOklabChromaInput,
    ColorchannelOptions,
    OklabChromaValue,
    ValueContext,
} from '../../../types';
import { createBaseValue } from '../../base';
import { nearest } from '../../number';
import { createColorValue } from '../value';

import { CHANNEL_NAME } from './private';
import { resolveOklabChromaValue } from './resolveOklabChromaValue';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorchannelOptions = {},
): OklabChromaValue => {
    context.consume(input);

    const { precision } = options;
    const value = resolveOklabChromaValue(context, input);

    return {
        ...createBaseValue(context),
        get: () => nearest(value, precision),
        name: () => CHANNEL_NAME,
        toColor: channels => {
            const { h, l } = channels;
            return createColorValue(context.outputContext(), { h, c: value, l });
        },
    };
};
