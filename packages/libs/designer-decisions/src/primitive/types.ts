import type { DesignerError } from '../errors';
import type { DeepPartial } from '../private';
import type { LinkedValueContext } from '../value';

export type _PrimitiveError = DesignerError & {
    layer: 'Primitive';
    context: PrimitiveContext;
    primitiveName: string;
};

export type PrimitiveInputError = _PrimitiveError & {
    name: 'PrimitiveInputError';
    input: unknown;
};

export type PrimitiveError = PrimitiveInputError;

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
