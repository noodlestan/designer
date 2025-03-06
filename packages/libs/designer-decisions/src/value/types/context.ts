import type { DecisionUnknown } from '../../decision';
import type { DecisionError, DecisionRefResolver } from '../../decision-context';
import type { DecisionInput, DecisionRef } from '../../inputs';
import type { LookupContexts } from '../../lookup';
import type { LinkedModelContext, ModelError } from '../../model';
import type { PrimitiveContext, PrimitiveError } from '../../primitive';
import type { DeepPartial } from '../../private';
import type { DecisionInputError } from '../../records';

import type { ValueError } from './errors';

export type ValueRefLookup = {
    ref: DecisionRef;
    context: LinkedModelContext;
    decision: DecisionUnknown | undefined;
};

export type LinkedValueContext<I = unknown> = {
    parent: () => LinkedValueContext | undefined;
    ref: () => DecisionRef;
    modelContext: () => LinkedModelContext;
    lookupContexts: () => LookupContexts;
    decisionInput: () => DecisionInput | undefined;
    input: () => DeepPartial<I> | undefined;
    lookups: () => ValueRefLookup[];
    childContexts: () => LinkedValueContext[];
    primitiveContexts: () => PrimitiveContext[];
    errors: () => (DecisionError | DecisionInputError | ModelError | ValueError | PrimitiveError)[];
    hasErrors: () => boolean;
};

export type ValueContext<I = unknown> = LinkedValueContext<I> & {
    resolve: DecisionRefResolver;
    childContext: <I>(input?: I | undefined) => ValueContext<I>;
    outputContext: <I>(input?: I | undefined) => ValueContext<I>;
    primitiveContext: <T>(input?: T | undefined) => PrimitiveContext<T>;
    addError: (error: ValueError) => void;
};

export type ParentValueContext<I = unknown> = LinkedValueContext<I> &
    Pick<ValueContext<I>, 'childContext'>;
