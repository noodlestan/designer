import type { DecisionContext, DecisionError, DecisionRefResolver } from '../decision-context';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { PrimitiveError } from '../primitive';
import type { DeepPartial } from '../private';
import type { DecisionInputError } from '../records';
import type { ValueContext, ValueError } from '../value';

export type ModelError = {
    context: ModelContext;
    message: () => string;
};

export type ModelUnexpectedError = ModelError & {
    input: unknown;
    error?: unknown;
};

export type LinkedModelContext<P extends object = object> = {
    resolve: DecisionRefResolver;
    ref: () => DecisionRef;
    decisionContext: () => DecisionContext;
    decisionType: () => string;
    decisionInput: () => DecisionInput | undefined;
    lookupContexts: () => LookupContexts;
    params: () => DeepPartial<P> | undefined;
    ownErrors: () => (DecisionError | DecisionInputError | ModelError)[];
    errors: () => (DecisionError | DecisionInputError | ModelError | ValueError | PrimitiveError)[];
    hasErrors: () => boolean;
    hasOwnErrors: () => boolean;
};

export type ModelContext<P extends object = object> = LinkedModelContext<P> & {
    valueContext: <I>(input?: I | undefined) => ValueContext<I>;
    addError: (error: ModelError) => void;
};
