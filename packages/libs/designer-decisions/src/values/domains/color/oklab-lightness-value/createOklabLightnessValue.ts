import type { ColorOklabLightnessInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { OklabLightnessValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createOklabLightnessValue = (
    context: ValueContext<ColorOklabLightnessInput>,

    options: ColorChannelBaseOptions = {},
): OklabLightnessValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, options);
};
