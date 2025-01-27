import type { ColorOklabChroma, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveOklabChromaValueRef } from './resolveOklabChromaValueRef';

export const resolveOklabChromaValue = (context: ValueContext, input: ColorOklabChroma): number => {
    if (isDecisionRef(input)) {
        return resolveOklabChromaValueRef(context, input);
    }
    return input;
};
