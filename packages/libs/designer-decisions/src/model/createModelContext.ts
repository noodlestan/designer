import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import { type LookupContexts, resolveLookupContext } from '../lookup';
import { createValueContext } from '../value';
import type { ParentValueContext, ValueContext } from '../value';

import type { LinkedModelContext, ModelContext, ModelError } from './types';

export const createModelContext = (
    decisionContext: DecisionContext,
    input: DecisionInput,
    context?: LookupContexts | ParentValueContext,
): ModelContext => {
    const lookupContexts = resolveLookupContext(context);
    const valueContexts: ValueContext[] = [];
    const errors: ModelError[] = [];

    const baseContext: LinkedModelContext = {
        resolve: decisionContext.resolve,
        ref: () => decisionContext.ref(),
        decisionContext: () => decisionContext,
        decisionType: decisionContext.decisionType,
        decisionInput: () => input,
        lookupContexts: () => lookupContexts,
        params: () => input.params,
        hasErrors: () =>
            decisionContext.hasErrors() ||
            Boolean(errors.length) ||
            Boolean(valueContexts.find(valueContext => valueContext.hasErrors())),
        errors: () => [
            ...decisionContext.errors(),
            ...errors,
            ...valueContexts.flatMap(valueContext => valueContext.errors()),
        ],
        ownErrors: () => [...decisionContext.errors(), ...errors],
        hasOwnErrors: () => decisionContext.hasErrors() || Boolean(errors.length),
    };

    const addError = (error: ModelError) => {
        errors.push(error);
    };

    const forValue = <I>(input?: I | undefined): ValueContext<I> => {
        const child = createValueContext(baseContext, input, context);
        valueContexts.push(child);
        return child;
    };

    const modelContext: ModelContext = {
        ...baseContext,
        forValue,
        addError,
    };

    return modelContext;
};
