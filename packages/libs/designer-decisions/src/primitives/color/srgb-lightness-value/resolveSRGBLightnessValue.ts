import type { ColorSRGBLightness, DecisionValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSRGBLightnessValueRef } from './resolveSRGBLightnessValueRef';

export const resolveSRGBLightnessValue = (
    context: DecisionValueContext,
    input: ColorSRGBLightness,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBLightnessValueRef(context, input);
    }
    return input;
};
