import type { ColorOklabLightness, DecisionValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveOklabLightnessValueRef } from './resolveOklabLightnessValueRef';

export const resolveOklabLightnessValue = (
    context: DecisionValueContext,
    input: ColorOklabLightness,
): number => {
    if (isDecisionRef(input)) {
        return resolveOklabLightnessValueRef(context, input);
    }
    return input;
};
