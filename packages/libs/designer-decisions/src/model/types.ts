import type { DecisionContext, DecisionError, DecisionRefResolver } from '../decision-context';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { PrimitiveError } from '../primitive';
import type { DeepPartial } from '../private';
import type { RecordError } from '../record';
import type { ValueContext, ValueError } from '../value';

export type LinkedModelContext<P extends object = object> = {
    resolve: DecisionRefResolver;
    ref: () => DecisionRef;
    decisionContext: () => DecisionContext;
    decisionType: () => string;
    decisionInput: () => DecisionInput | undefined;
    lookupContexts: () => LookupContexts;
    params: () => DeepPartial<P> | undefined;
    ownErrors: () => (DecisionError | RecordError)[];
    errors: () => (DecisionError | RecordError | ValueError | PrimitiveError)[];
    hasErrors: () => boolean;
    hasOwnErrors: () => boolean;
};

export type ModelContext<P extends object = object> = LinkedModelContext<P> & {
    forValue: <I>(input?: I | undefined) => ValueContext<I>;
};
