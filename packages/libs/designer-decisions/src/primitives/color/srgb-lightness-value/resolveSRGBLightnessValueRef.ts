import {
    isColorSRGBLightnessScaleDecision,
    isColorSRGBLightnessValueDecision,
    isColorSetDecision,
    isColorValueDecision,
} from '../../../decisions';
import type { ColorSRGBHSLiteral, DecisionRef } from '../../../inputs';
import type { ValueContext } from '../../../values';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../functions';
import type { ColorValue, SRGBLightnessValue } from '../../types';

import {
    REF_CHECKED_TYPES as accepted,
    FALLBACK_VALUE as fallback,
    VALUE_NAME as valueName,
} from './private';

export const resolveSRGBLightnessValueRef = (context: ValueContext, ref: DecisionRef): number => {
    const [, decision] = context.resolve(ref);

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isColorSetDecision(decision)) {
        const value = resolveSetRefDecision<ColorValue>(decision, context, valueName, ref);
        return value?.toObject<ColorSRGBHSLiteral>('hsl').l ?? fallback;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context).toObject<ColorSRGBHSLiteral>('hsl').l;
    }

    if (isColorSRGBLightnessScaleDecision(decision)) {
        const value = resolveSetRefDecision<SRGBLightnessValue>(decision, context, valueName, ref);
        return value?.get() ?? fallback;
    }

    if (isColorSRGBLightnessValueDecision(decision)) {
        return decision.produce(context).get();
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
