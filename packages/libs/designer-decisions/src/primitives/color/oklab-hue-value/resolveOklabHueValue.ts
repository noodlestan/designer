import type { ColorOklabHue, DecisionValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveOklabHueValueRef } from './resolveOklabHueValueRef';

export const resolveOklabHueValue = (
    context: DecisionValueContext,
    input: ColorOklabHue,
): number => {
    context.consume(input);
    if (isDecisionRef(input)) {
        return resolveOklabHueValueRef(context, input);
    }
    return input;
};
