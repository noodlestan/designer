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

    const resolve = <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<V> | undefined] => {
        const [decisionContext, decision] = resolver<V>(ref);
        lookups.push({ ref, context: decisionContext, decision });
        return [decisionContext, decision];
    };

    const baseContext: LinkedValueContext = {
        decisionContext: () => decisionContext,
        parent: () => parent,
        lookupContexts: () => lookupContexts,
        decisionInput: () => input,
        valueInput: () => state.valueInput,
        lookups: () => lookups,
        nested: () => nestedContexts,
        children: () => childContexts,
        errors: () => errors,
        hasErrors: () =>
            Boolean(errors.length) ||
            Boolean(nestedContexts.find(nested => nested.hasErrors())) ||
            Boolean(childContexts.find(child => child.hasErrors())),
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

    const nestedContext = () => {
        const nested = createValueContext(decisionContext, baseContext);
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
