import type { DecisionContext } from '../decision-context';
import type { DecisionInput } from '../inputs';
import { type LookupContexts, resolveLookupContext } from '../lookup';
import { createValueContext } from '../value';
import type { ParentValueContext, ValueContext } from '../value';

import type { LinkedModelContext, ModelContext } from './types';

export const createModelContext = (
    decisionContext: DecisionContext,
    input: DecisionInput,
    context?: LookupContexts | ParentValueContext,
): ModelContext => {
    const lookupContexts = resolveLookupContext(context);
    const valueContexts: ValueContext[] = [];

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
            Boolean(valueContexts.find(valueContext => valueContext.hasErrors())),
        errors: () => [
            ...decisionContext.errors(),
            ...valueContexts.flatMap(valueContext => valueContext.errors()),
        ],
        ownErrors: () => [...decisionContext.errors()],
        hasOwnErrors: () => decisionContext.hasErrors(),
    };

    const forValue = <I>(input?: I | undefined): ValueContext<I> => {
        const child = createValueContext(baseContext, input, context);
        valueContexts.push(child);
        return child;
    };

    const modelContext: ModelContext = {
        ...baseContext,
        forValue,
    };

    return modelContext;
};
