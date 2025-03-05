import type { ColorSRGBLightnessInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { SRGBLightnessValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createSRGBLightnessValue = (
    context: ValueContext,
    input?: DeepPartial<ColorSRGBLightnessInput>,
    options: ColorChannelBaseOptions = {},
): SRGBLightnessValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
};
