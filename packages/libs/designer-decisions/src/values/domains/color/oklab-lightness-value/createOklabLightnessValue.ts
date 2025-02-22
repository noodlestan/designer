import type { ColorOklabLightnessInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelValueOptions, type OklabLightnessValue } from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
    options: ColorChannelValueOptions = {},
): OklabLightnessValue => createColorChannelValue(CHANNEL_ATTRIBUTES, context, input, options);
