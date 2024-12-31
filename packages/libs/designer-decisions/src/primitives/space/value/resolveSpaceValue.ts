import type { SpaceInputValue, SpaceWithUnits, ValueContext } from '../../../types';
import { isDecisionRef } from '../../ref';

import { resolveSpaceValueRef } from './resolveSpaceValueRef';

export const resolveSpaceValue = (
    context: ValueContext,
    input: SpaceInputValue,
): SpaceWithUnits => {
    if (isDecisionRef(input)) {
        return resolveSpaceValueRef(context, input);
    } else if (typeof input === 'string') {
        return {
            value: Number(input),
            units: 'px',
        };
    } else if (typeof input === 'number') {
        return {
            value: input,
            units: 'px',
        };
    } else {
        return input;
    }
};
