import type { ColorOklabChromaInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { OklabChromaValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createOklabChromaValue = (
    context: ValueContext,
    input?: DeepPartial<ColorOklabChromaInput>,
    options: ColorChannelBaseOptions = {},
): OklabChromaValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
};
