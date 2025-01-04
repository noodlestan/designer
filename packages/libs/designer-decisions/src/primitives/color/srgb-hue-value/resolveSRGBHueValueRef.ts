import type { DecisionRef, DecisionValueContext } from '../../../types';
import { createRefMatchError, createRefNotFoundError } from '../../../values';

import { isColorSRGBHueValueDecision } from './isColorSRGBHueValueDecision';
import { FALLBACK_VALUE, REF_CHECKED_TYPES, VALUE_NAME } from './private';

export const resolveSRGBHueValueRef = (context: DecisionValueContext, ref: DecisionRef): number => {
    const decision = context.resolve(ref);

    if (!decision) {
        const error = createRefNotFoundError(context, VALUE_NAME, ref);
        context.addError(error);
        return FALLBACK_VALUE;
    }
    if (isColorSRGBHueValueDecision(decision)) {
        const v = decision.produce(context).value();
        return v.get();
    } else {
        const error = createRefMatchError(context, VALUE_NAME, ref, decision, REF_CHECKED_TYPES);
        context.addError(error);
        return FALLBACK_VALUE;
    }
};
