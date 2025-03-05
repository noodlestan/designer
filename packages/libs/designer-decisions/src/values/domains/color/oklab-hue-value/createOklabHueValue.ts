import type { ColorOklabHueInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { OklabHueValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createOklabHueValue = (
    context: ValueContext,
    input?: DeepPartial<ColorOklabHueInput>,
    options: ColorChannelBaseOptions = {},
): OklabHueValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
};
