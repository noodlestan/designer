import { type ColorSRGBLightnessInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const resolveSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
): number => resolveColorChannelValue(CHANNEL_ATTRIBUTES, context, input);
