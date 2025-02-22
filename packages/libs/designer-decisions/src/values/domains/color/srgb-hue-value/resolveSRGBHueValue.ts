import { type ColorSRGBHueInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const resolveSRGBHueValue = (context: ValueContext, input: ColorSRGBHueInput): number =>
    resolveColorChannelValue(CHANNEL_ATTRIBUTES, context, input);
