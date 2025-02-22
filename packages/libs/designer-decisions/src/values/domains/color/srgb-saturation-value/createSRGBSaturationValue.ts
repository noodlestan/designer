import type { ColorSRGBSaturationInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelValueOptions, type SRGBSaturationValue } from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
    options: ColorChannelValueOptions = {},
): SRGBSaturationValue => createColorChannelValue(CHANNEL_ATTRIBUTES, context, input, options);
