import type { ColorOklabHue, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveOklabHueValueRef } from './resolveOklabHueValueRef';

export const resolveOklabHueValue = (context: ValueContext, input: ColorOklabHue): number => {
    if (isDecisionRef(input)) {
        return resolveOklabHueValueRef(context, input);
    }
    return input;
};
