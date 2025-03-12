import { DECISION_SIZE_SCALE, DECISION_SIZE_VALUE } from '../../../constants';
import type { Decision } from '../../../decision';
import { isSetDecision, isSizeScaleDecision, isSizeValueDecision } from '../../../decision-types';
import type { DecisionRef, SizeAbsoluteUnits, SizeInput, SizeObjectLiteral } from '../../../inputs';
import type { Size } from '../../../primitives';
import { type ValueContext, handleDecisionNotFound, handleRefMismatchError } from '../../../value';
import type { SizeValue } from '../../domains';
import { resolveSetRefDecision } from '../../functions';
import type { BaseSet } from '../base-set';
import type { BaseValue } from '../base-value';

import type { SizeValueDefinition } from './types';

export const resolveSizeBaseValueRef = (
    sizeDefinition: SizeValueDefinition,
    context: ValueContext<SizeInput>,
    ref: DecisionRef,
): SizeObjectLiteral => {
    const { valueName, defaultUnit, fallback, decisionTypes } = sizeDefinition;
    const fallbackSize = { value: fallback, unit: defaultUnit as SizeAbsoluteUnits };

    const decision = context.resolve(ref);

    const refCheckedTypes = [
        DECISION_SIZE_SCALE,
        DECISION_SIZE_VALUE,
        decisionTypes.set,
        decisionTypes.value,
    ].filter(Boolean) as string[];

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallbackSize;
    }

    if (isSizeScaleDecision(decision)) {
        const value = resolveSetRefDecision<SizeValue>(context, decision, valueName, ref);
        return value?.literal() ?? fallbackSize;
    }

    if (isSizeValueDecision(decision)) {
        return decision.produce(context).literal();
    }

    if (decisionTypes.set && isSetDecision(decision) && decision.type() === decisionTypes.set) {
        const d = decision as Decision<BaseSet<SizeValue>>;
        const value = resolveSetRefDecision<SizeValue>(context, d, valueName, ref);
        return value?.literal() ?? fallbackSize;
    }

    if (decisionTypes.value && decision.type() === decisionTypes.value) {
        return (decision as Decision<BaseValue<Size>>).produce(context).literal();
    }

    handleRefMismatchError(context, decision, valueName, ref, refCheckedTypes);
    return fallbackSize;
};
