import type {
    Decision,
    DecisionContext,
    DecisionLookup,
    DecisionRef,
    PartialValueContext,
    ValueContext,
} from '../../types';

export const createValueContext = (
    decisionContext: DecisionContext,
    valueContext?: PartialValueContext,
): ValueContext => {
    const { resolve: resolver } = decisionContext;
    const contexts = valueContext?.contexts || { all: [] };

    const lookups: DecisionLookup[] = [];

    const resolve = <V>(ref: DecisionRef) => {
        const decision = resolver(decisionContext, ref) as Decision<V>;
        lookups.push({
            ref,
            decision,
        });
        return decision;
    };

    return {
        contexts,
        lookups,
        resolve,
    };
};
