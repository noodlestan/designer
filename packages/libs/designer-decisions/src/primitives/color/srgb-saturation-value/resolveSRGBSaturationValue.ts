import type { ColorSRGBSaturation, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSRGBSaturationValueRef } from './resolveSRGBSaturationValueRef';

export const resolveSRGBSaturationValue = (
    context: ValueContext,
    input: ColorSRGBSaturation,
): number => {
    if (isDecisionRef(input)) {
        return resolveSRGBSaturationValueRef(context, input);
    }
    return input;
};
