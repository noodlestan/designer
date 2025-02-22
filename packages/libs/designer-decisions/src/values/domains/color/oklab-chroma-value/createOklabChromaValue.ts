import type { ColorOklabChromaInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type ColorChannelValueOptions, type OklabChromaValue } from '../../../primitives';
import { createColorChannelValue } from '../_private';

import { CHANNEL_ATTRIBUTES } from './private';

export const createOklabChromaValue = (
    context: ValueContext,
    input: ColorOklabChromaInput,
    options: ColorChannelValueOptions = {},
): OklabChromaValue => createColorChannelValue(CHANNEL_ATTRIBUTES, context, input, options);
