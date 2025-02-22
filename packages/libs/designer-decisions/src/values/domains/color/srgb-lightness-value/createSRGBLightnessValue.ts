import type { ColorSRGBLightnessInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelValueOptions, type SRGBLightnessValue } from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const createSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
    options: ColorChannelValueOptions = {},
): SRGBLightnessValue => createColorChannelValue(CHANNEL_ATTRIBUTES, context, input, options);
