import type { ColorSRGBHue, DecisionValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSRGBHueValueRef } from './resolveSRGBHueValueRef';

export const resolveSRGBHueValue = (context: DecisionValueContext, input: ColorSRGBHue): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBHueValueRef(context, input);
    }
    return input;
};
