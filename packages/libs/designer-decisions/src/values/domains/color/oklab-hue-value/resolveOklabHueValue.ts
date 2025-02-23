import { type ColorOklabHueInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveOklabHueValue = (context: ValueContext, input: ColorOklabHueInput): number =>
    resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
