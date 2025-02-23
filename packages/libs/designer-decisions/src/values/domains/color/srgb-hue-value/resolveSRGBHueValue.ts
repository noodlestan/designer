import { type ColorSRGBHueInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveSRGBHueValue = (context: ValueContext, input: ColorSRGBHueInput): number =>
    resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
