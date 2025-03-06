import type { ColorSRGBLightnessInput } from '../../../../inputs';
import type { ColorChannelLiteral } from '../../../../primitives';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { resolveColorChannelBaseValue } from '../../../base';

import { CHANNEL_DEFINITION } from './private';

export const resolveSRGBLightnessValue = (
    context: ValueContext<ColorSRGBLightnessInput>,
): DeepPartial<ColorChannelLiteral> | undefined => {
    return resolveColorChannelBaseValue(CHANNEL_DEFINITION, context);
};
