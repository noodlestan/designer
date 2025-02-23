import type { ColorSRGBHueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { SRGBHueValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createSRGBHueValue = (
    context: ValueContext,
    input: ColorSRGBHueInput,
    options: ColorChannelBaseOptions = {},
): SRGBHueValue => createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
