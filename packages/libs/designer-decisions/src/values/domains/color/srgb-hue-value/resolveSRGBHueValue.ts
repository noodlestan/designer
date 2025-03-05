import type { ColorSRGBHueInput } from '../../../../inputs';
import type { ColorChannelLiteral } from '../../../../primitives';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveSRGBHueValue = (
    context: ValueContext,
    input?: DeepPartial<ColorSRGBHueInput>,
): DeepPartial<ColorChannelLiteral> | undefined => {
    return resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
};
