import type { Decision } from '../../decision';
import type { DecisionRef } from '../../inputs';
import { type LookupContexts, isLookupContext } from '../../lookup';
import type { LinkedModelContext } from '../../model';
import { type PrimitiveContext, createPrimitiveContext } from '../../primitive';
import type { DeepPartial } from '../../private';
import type { BaseValue } from '../../values';
import type { LinkedValueContext, ValueContext, ValueError, ValueRefLookup } from '../types';

export const createValueContextPrivate = <I = unknown>(
    modelContext: LinkedModelContext,
    input?: I,
    parentContext?: LookupContexts | LinkedValueContext,
): ValueContext<I> => {
    const { resolve: resolver } = modelContext;
    const lookupContexts = isLookupContext(parentContext)
        ? parentContext
        : parentContext?.lookupContexts() || { all: [] };
    const parent = isLookupContext(parentContext) ? undefined : parentContext;

    const lookups: ValueRefLookup[] = [];
    const childContexts: LinkedValueContext[] = [];
    const primitiveContexts: PrimitiveContext[] = [];
    const errors: ValueError[] = [];

    const resolve = <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
    ): Decision<V> => {
        const decision = resolver<V>(ref);
        lookups.push({ ref, context: modelContext, decision });
        return decision;
    };

    const baseContext: LinkedValueContext<I> = {
        parent: () => parent,
        ref: () => modelContext.ref(),
        modelContext: () => modelContext,
        decisionContext: () => modelContext.decisionContext(),
        decisionInput: () => modelContext.decisionInput(),
        lookupContexts: () => lookupContexts,
        input: () => input,
        lookups: () => lookups,
        childContexts: () => childContexts,
        primitiveContexts: () => primitiveContexts,
        errors: () => [
            ...modelContext.ownErrors(),
            ...errors,
            ...primitiveContexts.flatMap(primtive => primtive.errors()),
            ...childContexts.flatMap(child => child.errors()),
        ],
        hasErrors: () =>
            modelContext.hasOwnErrors() ||
            Boolean(errors.length) ||
            Boolean(primitiveContexts.find(primitiveContext => primitiveContext.hasErrors())) ||
            Boolean(childContexts.find(child => child.hasErrors())),
    };

    const addError = (error: ValueError) => {
        errors.push(error);
    };

    const childContext = <I>(input?: I | undefined): ValueContext<I> => {
        const child = createValueContextPrivate(modelContext, input, baseContext);
        childContexts.push(child);
        return child;
    };

    const outputContext = <I>(input?: I | undefined): ValueContext<I> => {
        return createValueContextPrivate(modelContext, input, baseContext);
    };

    const primitiveContext = <P>(input?: DeepPartial<P>) => {
        const primitive = createPrimitiveContext(input, baseContext);
        primitiveContexts.push(primitive);
        return primitive;
    };

    const valueContext: ValueContext<I> = {
        ...baseContext,
        resolve,
        addError,
        childContext,
        outputContext,
        primitiveContext,
    };

    return valueContext;
};
