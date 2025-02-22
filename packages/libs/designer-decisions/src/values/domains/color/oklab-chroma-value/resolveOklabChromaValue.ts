import { type ColorOklabChromaInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const resolveOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
): number => resolveColorChannelValue(CHANNEL_ATTRIBUTES, context, input);
