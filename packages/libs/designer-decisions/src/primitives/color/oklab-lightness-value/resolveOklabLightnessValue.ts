import type { ColorOklabLightness, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveOklabLightnessValueRef } from './resolveOklabLightnessValueRef';

export const resolveOklabLightnessValue = (
    context: ValueContext,
    input: ColorOklabLightness,
): number => {
    if (isDecisionRef(input)) {
        return resolveOklabLightnessValueRef(context, input);
    }
    return input;
};
