import { type ColorOklabLightnessInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const resolveOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
): number => resolveColorChannelValue(CHANNEL_ATTRIBUTES, context, input);
