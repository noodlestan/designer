import { isLookupContext } from '../../context';
import type {
    BaseValue,
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

    const childContexts: LinkedValueContext[] = [];
    const nestedContexts: LinkedValueContext[] = [];
    const lookups: DecisionLookup[] = [];
    const errors: DecisionValueError[] = [];

    const resolve = <T>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<BaseValue<T>> | undefined] => {
        const [decisionContext, decision] = resolver<T>(ref);
        lookups.push({
            ref,
            decision: decision as Decision<BaseValue<T>>,
        });
        return [decisionContext, decision];
    };

    const baseContext: LinkedValueContext = {
        decisionContext: () => decisionContext,
        decisionInput: () => input,
        valueInput: () => state.valueInput,
        lookupContexts: () => lookupContexts,
        parent: () => parent,
        lookups: () => lookups,
        children: () => childContexts,
        nested: () => nestedContexts,
        errors: () => errors,
        hasErrors: () =>
            Boolean(errors.length) ||
            Boolean(childContexts.find(child => child.hasErrors())) ||
            Boolean(nestedContexts.find(nested => nested.hasErrors())),
    };

    const consume = (input: unknown) => {
        if ('valueInput' in state) {
            const valueStr = JSON.stringify(state.valueInput);
            const decisionRefStr = JSON.stringify(decisionContext.ref());
            throw new Error(
                `Value for "${decisionRefStr}" has already consumed input (${valueStr}).`,
            );
        }
        state.valueInput = input;
    };

    const addError = (error: DecisionValueError) => {
        errors.push(error);
    };

    const childContext = (input?: DecisionInputBase) => {
        const child = createValueContext(decisionContext, baseContext, input);
        childContexts.push(child);
        return child;
    };

    const nestedContext = (input?: DecisionInputBase) => {
        const nested = createValueContext(decisionContext, baseContext, input);
        nestedContexts.push(nested);
        return nested;
    };

    const outputContext = () => {
        return createValueContext(decisionContext, baseContext);
    };

    const valueContext: DecisionValueContext = {
        ...baseContext,
        resolve,
        consume,
        addError,
        childContext,
        nestedContext,
        outputContext,
    };

    return valueContext;
};
