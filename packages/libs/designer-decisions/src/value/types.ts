import type { DecisionUnknown } from '../decision';
import type { DecisionContext, DecisionError, DecisionRefResolver } from '../decision-context';
import type { DesignerError } from '../errors';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { LinkedModelContext } from '../model';
import type { PrimitiveContext, PrimitiveError } from '../primitive';
import type { DeepPartial } from '../private';
import type { RecordError } from '../record';

type _ValueError = DesignerError & {
    layer: 'Value';
    context: ValueContext;
    valueName: string;
};

export type ValueInputError = _ValueError & {
    name: 'ValueInputError';
    input: unknown;
};

export type ValueRefNotFoundError = _ValueError & {
    name: 'ValueRefNotFoundError';
    ref: DecisionRef;
};

export type ValueRefMismatchError = _ValueError & {
    name: 'ValueRefMismatchError';
    ref: DecisionRef;
    decision: DecisionUnknown;
    accepted: string[];
};

export type ValueRefIndexError = _ValueError & {
    name: 'ValueRefIndexError';
    ref: DecisionRef;
};

export type ValueError =
    | ValueInputError
    | ValueRefNotFoundError
    | ValueRefMismatchError
    | ValueRefIndexError;

export type ValueRefLookup = {
    ref: DecisionRef;
    context: LinkedModelContext;
    decision: DecisionUnknown | undefined;
};

export type LinkedValueContext<I = unknown> = {
    parent: () => LinkedValueContext | undefined;
    ref: () => DecisionRef;
    modelContext: () => LinkedModelContext;
    decisionContext: () => DecisionContext;
    decisionInput: () => DecisionInput | undefined;
    lookupContexts: () => LookupContexts;
    input: () => DeepPartial<I> | undefined;
    lookups: () => ValueRefLookup[];
    childContexts: () => LinkedValueContext[];
    primitiveContexts: () => PrimitiveContext[];
    errors: () => (DecisionError | RecordError | ValueError | PrimitiveError)[];
    hasErrors: () => boolean;
};

export type ValueContext<I = unknown> = LinkedValueContext<I> & {
    resolve: DecisionRefResolver;
    forChildValue: <I>(input?: I | undefined) => ValueContext<I>;
    forOutputValue: <I>(input?: I | undefined) => ValueContext<I>;
    forPrimitive: <T>(input?: T | undefined) => PrimitiveContext<T>;
    addError: (error: ValueError) => void;
};

export type ParentValueContext<I = unknown> = LinkedValueContext<I> &
    Pick<ValueContext<I>, 'forChildValue'>;
