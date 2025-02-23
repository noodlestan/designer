import { DECISION_COLOR_SET, DECISION_COLOR_VALUE } from '../../../constants';
import {
    type Decision,
    isColorSetDecision,
    isColorValueDecision,
    isSetDecision,
} from '../../../decision';
import type { ColorObjectLiteral, DecisionRef } from '../../../inputs';
import type { ValueContext } from '../../../value';
import type { ColorValue } from '../../domains';
import {
    handleDecisionNotFound,
    handleRefMismatchError,
    resolveSetRefDecision,
} from '../../functions';
import type { BaseSet } from '../base-set';

import type { ColorChannelBaseValue, ColorChannelDefinition } from './types';

export const resolveColorChannelBaseValueRef = (
    channelDefinition: ColorChannelDefinition,
    context: ValueContext,
    ref: DecisionRef,
): number => {
    const { valueName, colorFormat, channelKey, fallback, decisionTypes } = channelDefinition;

    const [, decision] = context.resolve(ref);

    const accepted = [
        DECISION_COLOR_SET,
        DECISION_COLOR_VALUE,
        decisionTypes.set,
        decisionTypes.value,
    ];

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallback;
    }

    if (isColorSetDecision(decision)) {
        const value = resolveSetRefDecision<ColorValue>(decision, context, valueName, ref);
        return value?.toObject(colorFormat)[channelKey] ?? fallback;
    }

    if (isColorValueDecision(decision)) {
        return decision.produce(context).toObject<ColorObjectLiteral>(colorFormat)[channelKey];
    }

    if (isSetDecision(decision) && decision.type() === decisionTypes.set) {
        const value = resolveSetRefDecision<ColorChannelBaseValue>(
            decision as Decision<BaseSet<ColorChannelBaseValue>>,
            context,
            valueName,
            ref,
        );
        return (value?.get() as number) ?? fallback;
    }

    if (decision.type() === decisionTypes.value) {
        return decision.produce(context).get() as number;
    }

    handleRefMismatchError(context, decision, valueName, ref, accepted);
    return fallback;
};
