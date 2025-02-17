import type { DecisionContext, DecisionLookup } from '../../decisions';
import type { DecisionRefResolver, InputRecord } from '../../inputs';
import type { LookupContexts } from '../../lookup';

import type { DecisionValueError } from './errors';

export type ValueContext = {
    decisionContext: () => DecisionContext;
    parent: () => LinkedValueContext | undefined;
    lookupContexts: () => LookupContexts;
    decisionInput: () => InputRecord | undefined;
    resolve: DecisionRefResolver;
    valueInput: () => unknown | undefined;
    lookups: () => DecisionLookup[];
    nested: () => LinkedValueContext[];
    children: () => LinkedValueContext[];
    ownErrors: () => DecisionValueError[];
    allErrors: () => DecisionValueError[];
    hasErrors: () => boolean;
    consume: (input: unknown) => void;
    addError: (error: DecisionValueError) => void;
    childContext: (input?: InputRecord) => ValueContext;
    nestedContext: () => ValueContext;
    outputContext: () => ValueContext;
};

export type ParentValueContext = Omit<
    ValueContext,
    'resolve' | 'consume' | 'addError' | 'nestedContext' | 'outputContext'
>;

export type LinkedValueContext = Omit<ParentValueContext, 'childContext'>;
