import type { ColorSRGBSaturationInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type ColorChannelBaseOptions, createColorChannelBaseValue } from '../../../base';
import type { SRGBSaturationValue } from '../types';

import { CHANNEL_DEFINITION } from './private';

export const createSRGBSaturationValue = (
    context: ValueContext,
    input?: DeepPartial<ColorSRGBSaturationInput>,
    options: ColorChannelBaseOptions = {},
): SRGBSaturationValue => {
    return createColorChannelBaseValue(CHANNEL_DEFINITION, context, input, options);
};
