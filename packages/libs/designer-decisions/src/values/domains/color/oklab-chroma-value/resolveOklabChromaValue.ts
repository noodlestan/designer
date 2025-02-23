import { type ColorOklabChromaInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
): number => resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
