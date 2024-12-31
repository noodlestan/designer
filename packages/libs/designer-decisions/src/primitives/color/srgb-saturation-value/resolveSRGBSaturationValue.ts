import type { ColorSRGBSaturation, DecisionValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSRGBSaturationValueRef } from './resolveSRGBSaturationValueRef';

export const resolveSRGBSaturationValue = (
    context: DecisionValueContext,
    input: ColorSRGBSaturation,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBSaturationValueRef(context, input);
    }
    return input;
};
