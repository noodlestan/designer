import type { ColorOklabChroma, DecisionValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveOklabChromaValueRef } from './resolveOklabChromaValueRef';

export const resolveOklabChromaValue = (
    context: DecisionValueContext,
    input: ColorOklabChroma,
): number => {
    if (isDecisionRef(input)) {
        return resolveOklabChromaValueRef(context, input);
    }
    return input;
};
