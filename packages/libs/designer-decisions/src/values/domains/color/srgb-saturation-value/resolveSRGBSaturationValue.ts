import { type ColorSRGBSaturationInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
): number => resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
