import type { BaseSet, Decision, DecisionRef, ValueContext } from '../../types';
import { createRefIndexError } from '../../values';

export const resolveScaleRefDecision = <
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
        const error = createRefIndexError({ context, valueName, ref });
        context.addError(error);
    }
    return v as V;
};
