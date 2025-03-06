import type { DeepPartial } from '../private';
import type { LinkedValueContext } from '../value';

export type PrimitiveError = {
    context: PrimitiveContext;
    primitiveName: string;
    message: () => string;
};

export type PrimitiveInputError = PrimitiveError & {
    input: unknown;
    error?: unknown;
};

export type Primitive<T> = T & {
    literal: () => T;
    toString: () => string;
};

export type PrimitiveContext<P = unknown> = {
    valueContext: () => LinkedValueContext | undefined;
    outputContext: <O = unknown>(input?: DeepPartial<O>) => PrimitiveContext<O>;
    input: () => DeepPartial<P> | undefined;
    errors: () => PrimitiveError[];
    hasErrors: () => boolean;
    addError: (error: PrimitiveError) => void;
};
