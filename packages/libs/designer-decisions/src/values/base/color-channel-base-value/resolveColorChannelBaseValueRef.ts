import { DECISION_COLOR_SET, DECISION_COLOR_VALUE } from '../../../constants';
import type { Decision } from '../../../decision';
import { isColorSetDecision, isColorValueDecision, isSetDecision } from '../../../decision-types';
import type { DecisionRef } from '../../../inputs';
import type { ColorChannelDefinition, ColorChannelObjectLiteral } from '../../../primitives';
import type { ValueContext } from '../../../value';
import { handleDecisionNotFound, handleRefMismatchError } from '../../../value';
import type { ColorChannelValue, ColorValue } from '../../domains';
import { resolveSetRefDecision } from '../../functions';
import type { BaseSet } from '../base-set';

import type { ColorChannelBaseValue } from './types';

export const resolveColorChannelBaseValueRef = (
    channelDefinition: ColorChannelDefinition,
    context: ValueContext,
    ref: DecisionRef,
): ColorChannelObjectLiteral => {
    const { valueName, colorFormat, channelKey, fallback, decisionTypes } = channelDefinition;
    const fallbackChannek = { value: fallback };

    const decision = context.resolve(ref);

    const refCheckedTypes = [
        DECISION_COLOR_SET,
        DECISION_COLOR_VALUE,
        decisionTypes.set,
        decisionTypes.value,
    ].filter(Boolean) as string[];

    if (!decision) {
        handleDecisionNotFound(context, valueName, ref);
        return fallbackChannek;
    }

    if (isColorSetDecision(decision)) {
        const color = resolveSetRefDecision<ColorValue>(context, decision, valueName, ref);
        const channelValue = color?.get().toObject({ format: colorFormat })[channelKey];
        return channelValue !== undefined ? { value: channelValue } : fallbackChannek;
    }

    if (isColorValueDecision(decision)) {
        const color = decision.produce(context).get();
        const channelValue = color.toObject({ format: colorFormat })[channelKey];
        return { value: channelValue };
    }

    if (isSetDecision(decision) && decision.type() === decisionTypes.set) {
        const channel = resolveSetRefDecision<ColorChannelValue>(
            context,
            decision as Decision<BaseSet<ColorChannelValue>>,
            valueName,
            ref,
        );
        return channel?.get().literal() || fallbackChannek;
    }

    if (decision.type() === decisionTypes.value) {
        return (decision as Decision<ColorChannelBaseValue>).produce(context).get().literal();
    }

    handleRefMismatchError(context, decision, valueName, ref, refCheckedTypes);
    return fallbackChannek;
};
