import type { DecisionContext, DecisionError, DecisionRefResolver } from '../decision-context';
import type { DesignerError } from '../errors';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { PrimitiveError } from '../primitive';
import type { DeepPartial } from '../private';
import type { RecordError } from '../record';
import type { ValueContext, ValueError } from '../value';

export type _ModelError = DesignerError & {
    layer: 'Model';
    context: ModelContext;
};

export type ModelUnexpectedError = _ModelError & {
    name: 'ModelUnexpectedError';
    input: unknown;
};

export type ModelError = ModelUnexpectedError;

export type LinkedModelContext<P extends object = object> = {
    resolve: DecisionRefResolver;
    ref: () => DecisionRef;
    decisionContext: () => DecisionContext;
    decisionType: () => string;
    decisionInput: () => DecisionInput | undefined;
    lookupContexts: () => LookupContexts;
    params: () => DeepPartial<P> | undefined;
    ownErrors: () => (DecisionError | RecordError | ModelError)[];
    errors: () => (DecisionError | RecordError | ModelError | ValueError | PrimitiveError)[];
    hasErrors: () => boolean;
    hasOwnErrors: () => boolean;
};

export type ModelContext<P extends object = object> = LinkedModelContext<P> & {
    valueContext: <I>(input?: I | undefined) => ValueContext<I>;
    addError: (error: ModelError) => void;
};
