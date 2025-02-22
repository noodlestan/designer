import type { ColorOklabHueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelValueOptions, type OklabHueValue } from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const createOklabHueValue = (
    context: ValueContext,
    input: ColorOklabHueInput,
    options: ColorChannelValueOptions = {},
): OklabHueValue => createColorChannelValue(CHANNEL_ATTRIBUTES, context, input, options);
