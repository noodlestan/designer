import {
    isColorOklabChromaScaleDecision,
    isColorOklabChromaValueDecision,
    isColorSetDecision,
    isColorValueDecision,
} from '../../../decisions';
import type { ColorOkLCHLiteral, DecisionRef } from '../../../inputs';
import type { ValueContext } from '../../../values';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../functions';
import type { ColorValue, OklabChromaValue } from '../../types';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveOklabChromaValueRef = (context: ValueContext, ref: DecisionRef): number => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isColorSetDecision(decision)) {
        const value = resolveSetRefDecision<ColorValue>(decision, context, valueName, ref);
        return value?.toObject<ColorOkLCHLiteral>('oklch').c ?? fallback;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context).toObject<ColorOkLCHLiteral>('oklch').c;
    }

    if (isColorOklabChromaScaleDecision(decision)) {
        const value = resolveSetRefDecision<OklabChromaValue>(decision, context, valueName, ref);
        return value?.get() ?? fallback;
    }

    if (isColorOklabChromaValueDecision(decision)) {
        return decision.produce(context).get();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
