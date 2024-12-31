import type {
    Decision,
    DecisionContext,
    DecisionLookup,
    DecisionRef,
    DecisionValueContext,
    DecisionValueError,
    LinkedValueContext,
} from '../../types';

export const createValueContext = (
    decisionContext: DecisionContext,
    parentContext?: LinkedValueContext,
): DecisionValueContext => {
    const { resolve: resolver } = decisionContext;
    const contexts = parentContext?.contexts() || { all: [] };

    const children: LinkedValueContext[] = [];
    const lookups: DecisionLookup[] = [];
    const errors: DecisionValueError[] = [];

    const resolve = <V>(ref: DecisionRef) => {
        const decision = resolver(decisionContext, ref) as Decision<V>;
        lookups.push({
            ref,
            decision,
        });
        return decision;
    };

    const baseContext: LinkedValueContext = {
        owner: decisionContext.owner,
        contexts: () => contexts,
        parent: () => parentContext,
        children: () => children,
        lookups: () => lookups,
        errors: () => errors,
        hasErrors: () =>
            Boolean(errors.length) || Boolean(children.find(child => child.hasErrors())),
    };

    const createChildContext = () => {
        const child = createValueContext(decisionContext, baseContext);
        children.push(child);
        return child;
    };

    const addError = (error: DecisionValueError) => {
        errors.push(error);
    };

    const valueContext = {
        ...baseContext,
        resolve,
        createChildContext,
        addError,
    };

    return valueContext;
};
