import type { Decision, DecisionLookup } from '../../decision';
import type { DecisionContext } from '../../decision-context';
import type { DecisionInput, DecisionRef } from '../../inputs';
import { type LookupContexts, isLookupContext } from '../../lookup';
import { type PrimitiveContext, createPrimitiveContext } from '../../primitive';
import type { DeepPartial } from '../../private';
import type { BaseValue } from '../../values';
import type { LinkedValueContext, ValueContext, ValueError } from '../types';

export const createValueContextPrivate = (
    decisionContext: DecisionContext,
    input: DecisionInput,
    parentContext?: LookupContexts | LinkedValueContext,
): ValueContext => {
    const { resolve: resolver } = decisionContext;
    const lookupContexts = isLookupContext(parentContext)
        ? parentContext
        : parentContext?.lookupContexts() || { all: [] };
    const parent = isLookupContext(parentContext) ? undefined : parentContext;

    const lookups: DecisionLookup[] = [];
    const childContexts: LinkedValueContext[] = [];
    const primitiveContexts: PrimitiveContext[] = [];
    const errors: ValueError[] = [];

    const resolve = <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
    ): Decision<V> => {
        const decision = resolver<V>(ref);
        lookups.push({ ref, context: decisionContext, decision });
        return decision;
    };

    const baseContext: LinkedValueContext = {
        parent: () => parent,
        decisionContext: () => decisionContext,
        lookupContexts: () => lookupContexts,
        input: () => input,
        params: () => input.params || {},
        lookups: () => lookups,
        children: () => childContexts,
        nested: () => primitiveContexts,
        ownErrors: () => errors,
        allErrors: () => [
            ...errors,
            ...primitiveContexts.flatMap(primtive => primtive.errors()),
            ...childContexts.flatMap(child => child.allErrors()),
        ],
        hasErrors: () =>
            Boolean(errors.length) ||
            Boolean(primitiveContexts.find(nested => nested.hasErrors())) ||
            Boolean(childContexts.find(child => child.hasErrors())),
    };

    const addError = (error: ValueError) => {
        errors.push(error);
    };

    const childContext = (input: DecisionInput) => {
        const child = createValueContextPrivate(decisionContext, input, baseContext);
        childContexts.push(child);
        return child;
    };

    const primitiveContext = <T>(input?: DeepPartial<T>) => {
        const primitive = createPrimitiveContext(input, baseContext);
        primitiveContexts.push(primitive);
        return primitive;
    };

    const valueContext: ValueContext = {
        ...baseContext,
        resolve,
        addError,
        childContext,
        primitiveContext,
    };

    return valueContext;
};
