import type { ColorOklabLightnessInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { OklabLightnessValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
    options: ColorChannelBaseOptions = {},
): OklabLightnessValue => createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
