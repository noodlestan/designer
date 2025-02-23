import type { ColorOklabChromaInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { OklabChromaValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorChannelBaseOptions = {},
): OklabChromaValue => createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
