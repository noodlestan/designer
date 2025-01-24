import type { DecisionId, DecisionInputBase, DecisionName } from '../decision-inputs';
import type { BaseValue } from '../primitive-values';

export type Value = unknown;
export type Params = object;

// export type Token<T extends Value> = {
//     decision: () => Decision<T>;
// };

export type DecisionError = {
    msg: string;
};

export type DecisionContext = {
    ref: () => DecisionRef;
    resolve: DecisionRefResolver;
    inputs: () => DecisionInputBase[];
    hasErrors: () => boolean;
    errors: () => DecisionError[];
    addError: (error: DecisionError) => void;
};

export type DecisionLookup = {
    ref: DecisionRef;
    decision: DecisionUnknown;
};

export type DecisionValueError = {
    msg: string;
};

export type DecisionValueContext = {
    decisionContext: () => DecisionContext;
    decisionInput: () => DecisionInputBase | undefined;
    valueInput: () => unknown | undefined;
    lookupContexts: () => LookupContexts;
    parent: () => LinkedValueContext | undefined;
    resolve: DecisionRefResolver;
    lookups: () => DecisionLookup[];
    nested: () => LinkedValueContext[];
    children: () => LinkedValueContext[];
    errors: () => DecisionValueError[];
    hasErrors: () => boolean;
    consume: (input: unknown) => void;
    addError: (error: DecisionValueError) => void;
    childContext: (input?: DecisionInputBase) => DecisionValueContext;
    nestedContext: () => DecisionValueContext;
    outputContext: () => DecisionValueContext;
};

export type ParentValueContext = Omit<
    DecisionValueContext,
    'resolve' | 'consume' | 'addError' | 'nestedContext' | 'outputContext'
>;
export type LinkedValueContext = Omit<ParentValueContext, 'childContext'>;

export type LookupContexts = {
    all: string[];
    any?: string[];
};

export type Decision<V extends BaseValue<unknown>> = {
    type: () => string;
    uuid: () => string | undefined;
    name: () => string;
    description: () => string | undefined;
    inputs: () => DecisionInputBase[];
    input: () => DecisionInputBase; // WIP match contexts
    model: () => string; // WIP match contexts
    params: () => object; // WIP match contexts
    produce: (context?: LookupContexts | ParentValueContext) => V;
    // token: () => Token<T> | undefined;
};

export type DecisionFactory = <V = unknown>(
    input: unknown,
    resolver: <V extends BaseValue<unknown>>(ref: DecisionRef) => Decision<V>,
) => Decision<BaseValue<V>>;

export type DecisionNameRef = {
    $name: DecisionName;
    index?: number;
};

export type DecisionUuidRef = {
    $uuid: DecisionId;
    index?: number;
};

export type DecisionRef = DecisionNameRef | DecisionUuidRef;

export type DecisionRefResolver = <V extends BaseValue<unknown> = BaseValue<unknown>>(
    ref: DecisionRef,
) => [DecisionContext, Decision<V> | undefined];

export type DecisionModel<V = BaseValue<unknown>, P = object> = {
    produce: (context: DecisionValueContext, params: P) => V;
};

export type DecisionModelFactory<
    V = BaseValue<unknown>,
    I extends DecisionInputBase = DecisionInputBase,
> = () => DecisionModel<V, I['params']>;

export type DecisionUnknown = Decision<BaseValue<unknown>>;
