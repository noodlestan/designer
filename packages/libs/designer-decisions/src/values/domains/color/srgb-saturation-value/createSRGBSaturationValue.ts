import type { ColorSRGBSaturationInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { SRGBSaturationValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
    options: ColorChannelBaseOptions = {},
): SRGBSaturationValue => createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
