import type { ColorSRGBHueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelValueOptions, type SRGBHueValue } from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorChannelValueOptions = {},
): SRGBHueValue => createColorChannelValue(CHANNEL_ATTRIBUTES, context, input, options);
