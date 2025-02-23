import { DECISION_SIZE_SCALE, DECISION_SIZE_VALUE } from '../../../constants';
import {
    type Decision,
    isSetDecision,
    isSizeScaleDecision,
    isSizeValueDecision,
} from '../../../decision';
import type { DecisionRef, SizeObjectLiteral } from '../../../inputs';
import type { ValueContext } from '../../../value';
import type { SizeValue } from '../../domains';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../functions';
import type { Size } from '../../primitives';
import type { BaseSet } from '../base-set';

import type { BaseSizeValue, SizeDefinition } from './types';

export const resolveSizeBaseValueRef = (
    sizeDefinition: SizeDefinition,
    context: ValueContext,
    ref: DecisionRef,
): SizeObjectLiteral => {
    const { fallback, valueName, decisionTypes } = sizeDefinition;

    const [, decision] = context.resolve(ref);

    const accepted = [
        DECISION_SIZE_SCALE,
        DECISION_SIZE_VALUE,
        decisionTypes.set,
        decisionTypes.value,
    ].filter(Boolean) as string[];

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isSizeScaleDecision(decision)) {
        const value = resolveSetRefDecision<SizeValue>(decision, context, valueName, ref);
        return value?.toObject() ?? fallback;
    }

    if (isSizeValueDecision(decision)) {
        return decision.produce(context).toObject();
    }

    if (isSetDecision(decision) && decision.type() === decisionTypes.set) {
        const value = resolveSetRefDecision<BaseSizeValue>(
            decision as Decision<BaseSet<BaseSizeValue>>,
            context,
            valueName,
            ref,
        );
        return value?.get() ?? fallback;
    }

    if (decision.type() === decisionTypes.value) {
        return decision.produce(context).get() as Size;
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
