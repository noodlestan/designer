import type { ColorSRGBLightness, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSRGBLightnessValueRef } from './resolveSRGBLightnessValueRef';

export const resolveSRGBLightnessValue = (
    context: ValueContext,
    input: ColorSRGBLightness,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBLightnessValueRef(context, input);
    }
    return input;
};
