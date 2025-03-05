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

export type Primitive<P> = P & {
    literal: () => P;
    toString: () => string;
};

export type PrimitiveContext<T = unknown> = {
    valueContext: () => LinkedValueContext | undefined;
    outputContext: <T = unknown>(input?: DeepPartial<T>) => PrimitiveContext<T>;
    input: () => DeepPartial<T> | undefined;
    errors: () => PrimitiveInputError[];
    hasErrors: () => boolean;
    addError: (error: PrimitiveInputError) => void;
};
