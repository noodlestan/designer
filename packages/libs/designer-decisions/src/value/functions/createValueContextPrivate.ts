import type { Decision, DecisionContext, DecisionLookup } from '../../decision';
import type { DecisionInput, DecisionRef } from '../../inputs';
import { type LookupContexts, isLookupContext } from '../../lookup';
import type { BaseValue } from '../../values';
import type { LinkedValueContext, ValueContext, ValueError } from '../types';

type State = {
    valueInput?: unknown;
};

export const createValueContextPrivate = (
    decisionContext: DecisionContext,
    parentContext?: LookupContexts | LinkedValueContext,
    input?: DecisionInput,
): ValueContext => {
    const state: State = {};

    const { resolve: resolver } = decisionContext;
    const lookupContexts = isLookupContext(parentContext)
        ? parentContext
        : parentContext?.lookupContexts() || { all: [] };
    const parent = isLookupContext(parentContext) ? undefined : parentContext;

    const childContexts: LinkedValueContext[] = [];
    const nestedContexts: LinkedValueContext[] = [];
    const lookups: DecisionLookup[] = [];
    const errors: ValueError[] = [];

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
        ownErrors: () => errors,
        allErrors: () => [
            ...errors,
            ...nestedContexts.flatMap(nested => nested.allErrors()),
            ...childContexts.flatMap(child => child.allErrors()),
        ],
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

    const addError = (error: ValueError) => {
        errors.push(error);
    };

    const childContext = (input?: DecisionInput) => {
        const child = createValueContextPrivate(decisionContext, baseContext, input);
        childContexts.push(child);
        return child;
    };

    const nestedContext = () => {
        const nested = createValueContextPrivate(decisionContext, baseContext);
        nestedContexts.push(nested);
        return nested;
    };

    const outputContext = () => {
        return createValueContextPrivate(decisionContext, baseContext);
    };

    const valueContext: ValueContext = {
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
