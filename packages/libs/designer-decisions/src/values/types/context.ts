import type { DecisionContext, DecisionLookup } from '../../decisions';
import type { DecisionInput, DecisionRefResolver } from '../../inputs';
import type { LookupContexts } from '../../lookup';

import type { ValueError } from './errors';

export type ValueContext = {
    decisionContext: () => DecisionContext;
    parent: () => LinkedValueContext | undefined;
    lookupContexts: () => LookupContexts;
    decisionInput: () => DecisionInput | undefined;
    resolve: DecisionRefResolver;
    valueInput: () => unknown | undefined;
    lookups: () => DecisionLookup[];
    nested: () => LinkedValueContext[];
    children: () => LinkedValueContext[];
    ownErrors: () => ValueError[];
    allErrors: () => ValueError[];
    hasErrors: () => boolean;
    consume: (input: unknown) => void;
    addError: (error: ValueError) => void;
    childContext: (input?: DecisionInput) => ValueContext;
    nestedContext: () => ValueContext;
    outputContext: () => ValueContext;
};

export type ParentValueContext = Omit<
    ValueContext,
    'resolve' | 'consume' | 'addError' | 'nestedContext' | 'outputContext'
>;

export type LinkedValueContext = Omit<ParentValueContext, 'childContext'>;
