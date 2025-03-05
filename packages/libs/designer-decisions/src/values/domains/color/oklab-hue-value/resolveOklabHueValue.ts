import type { ColorOklabHueInput } from '../../../../inputs';
import type { ColorChannelLiteral } from '../../../../primitives';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveOklabHueValue = (
    context: ValueContext,
    input?: DeepPartial<ColorOklabHueInput>,
): DeepPartial<ColorChannelLiteral> | undefined => {
    return resolveColorChannelBaseValue(CHANNEL_DEFINITION, context, input);
};
