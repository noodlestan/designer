import type {
    Decision,
    DecisionContext,
    DecisionLookup,
    DecisionRef,
    ParentValueContext,
    ValueContext,
} from '../../types';

export const createValueContext = (
    decisionContext: DecisionContext,
    parentContext?: ParentValueContext,
): ValueContext => {
    const { resolve: resolver } = decisionContext;
    const contexts = parentContext?.contexts || { all: [] };

    const lookups: DecisionLookup[] = [];

    const resolve = <V>(ref: DecisionRef) => {
        const decision = resolver(decisionContext, ref) as Decision<V>;
        lookups.push({
            ref,
            decision,
        });
        return decision;
    };

    const valueContext = {
        resolve,
        contexts,
        parent: parentContext,
        children: [],
        lookups,
        errors,
    };

    if (parentContext) {
        parentContext.children?.push(valueContext);
    }

    return valueContext;
};
