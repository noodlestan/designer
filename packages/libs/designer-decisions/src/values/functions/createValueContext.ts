import { isLookupContext } from '../../context';
import type {
    Decision,
    DecisionContext,
    DecisionInputBase,
    DecisionLookup,
    DecisionRef,
    DecisionValueContext,
    DecisionValueError,
    LinkedValueContext,
    LookupContexts,
} from '../../types';

export const createValueContext = (
    decisionContext: DecisionContext,
    parentContext?: LookupContexts | LinkedValueContext,
    input?: DecisionInputBase,
): DecisionValueContext => {
    const { resolve: resolver } = decisionContext;
    const lookupContexts = isLookupContext(parentContext)
        ? parentContext
        : parentContext?.lookupContexts() || { all: [] };
    const parent = isLookupContext(parentContext) ? undefined : parentContext;

    const children: LinkedValueContext[] = [];
    const lookups: DecisionLookup[] = [];
    const errors: DecisionValueError[] = [];

    const resolve = <V>(ref: DecisionRef): [DecisionContext, Decision<V> | undefined] => {
        const [decisionContext, decision] = resolver<V>(ref);
        lookups.push({
            ref,
            decision: decision as Decision<V>,
        });
        return [decisionContext, decision];
    };

    const baseContext: LinkedValueContext = {
        decisionContext: () => decisionContext,
        input: () => input,
        lookupContexts: () => lookupContexts,
        parent: () => parent,
        children: () => children,
        lookups: () => lookups,
        errors: () => errors,
        hasErrors: () =>
            Boolean(errors.length) || Boolean(children.find(child => child.hasErrors())),
    };

    const createChildContext = (input?: DecisionInputBase) => {
        const child = createValueContext(decisionContext, baseContext, input);
        children.push(child);
        return child;
    };

    const addError = (error: DecisionValueError) => {
        errors.push(error);
    };

    const valueContext: DecisionValueContext = {
        ...baseContext,
        resolve,
        addError,
        createChildContext,
    };

    return valueContext;
};
