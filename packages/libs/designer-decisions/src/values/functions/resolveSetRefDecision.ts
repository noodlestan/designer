import type { Decision } from '../../decision';
import type { DecisionRef } from '../../inputs';
import { type ValueContext, createValueRefIndexError } from '../../value';
import type { BaseSet } from '../base';

export const resolveSetRefDecision = <
    V = unknown,
    T extends Decision<BaseSet<V>> = Decision<BaseSet<V>>,
>(
    context: ValueContext,
    decision: T,
    valueName: string,
    ref: DecisionRef,
): V | undefined => {
    const scale = decision.produce(context);
    const v = scale.item(ref.index || 0);
    if (!v) {
        const error = createValueRefIndexError({ context, valueName, ref });
        context.addError(error);
    }
    return v as V;
};
