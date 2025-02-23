import { type ColorOklabLightnessInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightnessInput,
): number => resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
