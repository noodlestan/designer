import type { Color } from 'chroma-js';

import { isColorSetDecision, isColorValueDecision } from '../../../decisions';
import type { DecisionRef, ValueContext } from '../../../types';
import {
    createRefIndexError,
    createRefMismatchError,
    createRefNotFoundError,
} from '../../../values';

import { FALLBACK_VALUE, REF_CHECKED_TYPES as accepted, VALUE_NAME as name } from './private';

export const resolveColorValueRef = (context: ValueContext, ref: DecisionRef): Color => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError({ context, name, ref });
        context.addError(error);
        return FALLBACK_VALUE;
    }

    if (isColorValueDecision(decision)) {
        const v = decision.produce(context);
        return v.get();
    } else if (isColorSetDecision(decision)) {
        const set = decision.produce(context);
        const v = set.get().item(ref.index || 0);
        if (!v) {
            const error = createRefIndexError({ context, name, ref });
            context.addError(error);
            return FALLBACK_VALUE;
        }
        return v.get();
    } else {
        const error = createRefMismatchError({ context, name, ref, decision, accepted });
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
