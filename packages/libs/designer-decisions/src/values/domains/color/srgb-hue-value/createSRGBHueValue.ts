import type { ColorSRGBHueInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { SRGBHueValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createSRGBHueValue = (
    context: ValueContext,
    input?: DeepPartial<ColorSRGBHueInput>,
    options: ColorChannelBaseOptions = {},
): SRGBHueValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
};
