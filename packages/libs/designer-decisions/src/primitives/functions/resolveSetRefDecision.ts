import type { Decision } from '../../decisions';
import type { DecisionRef } from '../../inputs';
import { type ValueContext, createValueRefIndexError } from '../../values';
import type { BaseSet } from '../types';

export const resolveSetRefDecision = <
    V = unknown,
    T extends Decision<BaseSet<V>> = Decision<BaseSet<V>>,
>(
    decision: T,
    context: ValueContext,
    valueName: string,
    ref: DecisionRef,
): V | undefined => {
    const scale = decision.produce(context);
    const v = scale.get().item(ref.index || 0);
    if (!v) {
        const error = createValueRefIndexError({ context, valueName, ref });
        context.addError(error);
    }
    return v as V;
};
