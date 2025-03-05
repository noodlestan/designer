import type { ColorOklabLightnessInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { OklabLightnessValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createOklabLightnessValue = (
    context: ValueContext,
    input?: DeepPartial<ColorOklabLightnessInput>,
    options: ColorChannelBaseOptions = {},
): OklabLightnessValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
};
