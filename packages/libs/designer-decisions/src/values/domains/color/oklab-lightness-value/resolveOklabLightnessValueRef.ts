import {
    isColorOklabLightnessScaleDecision,
    isColorOklabLightnessValueDecision,
    isColorSetDecision,
    isColorValueDecision,
} from '../../../../decision';
import type { ColorOkLCHLiteral, DecisionRef } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../../functions';
import type { ColorValue, OklabLightnessValue } from '../../../primitives';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveOklabLightnessValueRef = (context: ValueContext, ref: DecisionRef): number => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isColorSetDecision(decision)) {
        const value = resolveSetRefDecision<ColorValue>(decision, context, valueName, ref);
        return value?.toObject<ColorOkLCHLiteral>('oklch').l ?? fallback;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context).toObject<ColorOkLCHLiteral>('oklch').l;
    }

    if (isColorOklabLightnessScaleDecision(decision)) {
        const value = resolveSetRefDecision<OklabLightnessValue>(decision, context, valueName, ref);
        return value?.get() ?? fallback;
    }

    if (isColorOklabLightnessValueDecision(decision)) {
        return decision.produce(context).get();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
