import {
    isColorOklabChromaScaleDecision,
    isColorOklabChromaValueDecision,
    isColorSetDecision,
    isColorValueDecision,
} from '../../../decisions';
import type {
    ColorOkLCHLiteral,
    ColorValue,
    DecisionRef,
    SRGBSaturationValue,
    ValueContext,
} from '../../../types';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveScaleRefDecision,
} from '../../functions';

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
        const value = resolveScaleRefDecision<ColorValue>(decision, context, valueName, ref);
        return value?.toObject<ColorOkLCHLiteral>('oklch').c ?? fallback;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context).toObject<ColorOkLCHLiteral>('oklch').c;
    }

    if (isColorOklabChromaScaleDecision(decision)) {
        const value = resolveScaleRefDecision<SRGBSaturationValue>(
            decision,
            context,
            valueName,
            ref,
        );
        return value?.get() ?? fallback;
    }

    if (isColorOklabChromaValueDecision(decision)) {
        return decision.produce(context).get();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
