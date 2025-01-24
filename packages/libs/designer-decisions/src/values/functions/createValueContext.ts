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

type State = {
    valueInput?: unknown;
};

export const createValueContext = (
    decisionContext: DecisionContext,
    parentContext?: LookupContexts | LinkedValueContext,
    input?: DecisionInputBase,
): DecisionValueContext => {
    const state: State = {};

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
        decisionInput: () => input,
        valueInput: () => state.valueInput,
        lookupContexts: () => lookupContexts,
        parent: () => parent,
        children: () => children,
        lookups: () => lookups,
        errors: () => errors,
        hasErrors: () =>
            Boolean(errors.length) || Boolean(children.find(child => child.hasErrors())),
    };

    const consume = (input: unknown) => {
        if ('input' in state) {
            const data = JSON.stringify(state.valueInput);
            throw new Error(`Value has already consumed input: "${data}".`);
        }
        state.valueInput = input;
    };

    const addError = (error: DecisionValueError) => {
        errors.push(error);
    };

    const createChildContext = (input?: DecisionInputBase) => {
        const child = createValueContext(decisionContext, baseContext, input);
        children.push(child);
        return child;
    };

    const valueContext: DecisionValueContext = {
        ...baseContext,
        resolve,
        consume,
        addError,
        createChildContext,
    };

    return valueContext;
};
