import type { DecisionLookup } from '../../decision';
import type { DecisionContext, DecisionRefResolver } from '../../decision-context';
import type { DecisionInput } from '../../inputs';
import type { LookupContexts } from '../../lookup';
import type { PrimitiveContext, PrimitiveError } from '../../primitive';
import type { DeepPartial } from '../../private';

import type { ValueError } from './errors';

export type LinkedValueContext<P extends object = object> = {
    parent: () => LinkedValueContext | undefined;
    decisionContext: () => DecisionContext;
    lookupContexts: () => LookupContexts;
    input: () => DecisionInput | undefined;
    params: () => DeepPartial<P> | undefined;
    lookups: () => DecisionLookup[];
    children: () => LinkedValueContext[];
    nested: () => PrimitiveContext[];
    ownErrors: () => ValueError[];
    allErrors: () => (ValueError | PrimitiveError)[];
    hasErrors: () => boolean;
};

export type ValueContext<P extends object = object> = LinkedValueContext<P> & {
    childContext: (input: DecisionInput) => ValueContext;
    primitiveContext: <T>(input?: T | undefined) => PrimitiveContext<T>;
    resolve: DecisionRefResolver;
    addError: (error: ValueError) => void;
};

export type ParentValueContext<P extends object = object> = LinkedValueContext<P> &
    Pick<ValueContext<P>, 'childContext'>;
