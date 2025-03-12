import { D_COLOR_SET, D_COLOR_VALUE, D_COLOR_VALUE as valueName } from '../../../../constants';
import { isColorSet, isColorValue } from '../../../../decision-types';
import type { ColorOkLCHLiteral, DecisionRef } from '../../../../inputs';
import { COLOR_FALLBACK_LITERAL } from '../../../../primitives';
import {
    type ValueContext,
    handleDecisionNotFound,
    handleRefMismatchError,
} from '../../../../value';
import { resolveSetRefDecision } from '../../../functions';
import type { ColorValue } from '../types';

const REF_CHECKED_TYPES = [D_COLOR_SET, D_COLOR_VALUE];

export const resolveColorValueRef = (
    context: ValueContext,
    ref: DecisionRef,
): ColorOkLCHLiteral => {
    const decision = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return COLOR_FALLBACK_LITERAL;
    }

    if (isColorSet(decision)) {
        const value = resolveSetRefDecision<ColorValue>(context, decision, valueName, ref);
        return value?.toObject() ?? COLOR_FALLBACK_LITERAL;
    }

    if (isColorValue(decision)) {
        return decision.produce(context).toObject();
    }

    handleRefMismatchError(context, decision, valueName, ref, REF_CHECKED_TYPES);
    return COLOR_FALLBACK_LITERAL;
};
