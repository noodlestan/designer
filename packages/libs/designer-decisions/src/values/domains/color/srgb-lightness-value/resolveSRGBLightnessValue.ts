import { type ColorSRGBLightnessInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightnessInput,
): number => resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
