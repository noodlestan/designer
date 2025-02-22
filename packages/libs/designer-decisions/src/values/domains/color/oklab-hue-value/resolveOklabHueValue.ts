import { type ColorOklabHueInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const resolveOklabHueValue = (context: ValueContext, input: ColorOklabHueInput): number =>
    resolveColorChannelValue(CHANNEL_ATTRIBUTES, context, input);
