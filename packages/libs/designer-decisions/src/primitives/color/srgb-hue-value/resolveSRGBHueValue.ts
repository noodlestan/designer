import type { ColorSRGBHue, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSRGBHueValueRef } from './resolveSRGBHueValueRef';

export const resolveSRGBHueValue = (context: ValueContext, input: ColorSRGBHue): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBHueValueRef(context, input);
    }
    return input;
};
