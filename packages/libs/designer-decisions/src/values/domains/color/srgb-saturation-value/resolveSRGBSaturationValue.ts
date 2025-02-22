import { type ColorSRGBSaturationInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const resolveSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturationInput,
): number => resolveColorChannelValue(CHANNEL_ATTRIBUTES, context, input);
