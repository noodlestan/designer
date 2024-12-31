import type { DecisionId, DecisionInputBase, DecisionName } from '../decision-inputs';

export type Value = unknown;
export type Params = object;

// export type Token<T extends Value> = {
//     decision: () => Decision<T>;
// };

export type DecisionError = {
    msg: string;
};

export type DecisionContext = {
    resolve: DecisionRefResolver;
    owner: () => DecisionInputBase;
    contexts: () => LookupContexts;
    hasErrors: () => boolean;
    errors: () => DecisionError[];
    addError: (error: DecisionError) => void;
};

export type DecisionLookup = {
    ref: DecisionRef;
    decision: Decision<unknown>;
};

export type DecisionValueRefResolver = <V = unknown>(ref: DecisionRef) => Decision<V> | undefined;

export type DecisionValueError = {
    msg: string;
};

export type DecisionValueContext = {
    owner: () => DecisionInputBase;
    resolve: DecisionValueRefResolver;
    createChildContext: () => DecisionValueContext;
    contexts: () => LookupContexts;
    parent: () => LinkedValueContext | undefined;
    children: () => LinkedValueContext[];
    lookups: () => DecisionLookup[];
    hasErrors: () => boolean;
    errors: () => DecisionValueError[];
    addError: (error: DecisionValueError) => void;
};

export type ParentValueContext = Omit<DecisionValueContext, 'resolve' | 'addError'>;
export type LinkedValueContext = Omit<
    DecisionValueContext,
    'resolve' | 'createChildContext' | 'addError'
>;

export type LookupContexts = {
    all: string[];
    any?: string[];
};

export type DecisionValue<V> = {
    hasErrors: () => boolean;
    errors: () => DecisionValueError[];
    value: () => V;
};

export type Decision<V extends Value> = {
    input: () => DecisionInputBase;
    produce: (parentContext?: ParentValueContext) => DecisionValue<V>;
    // token: () => Token<T> | undefined;
    // explain: () => ...
    // validate: () => ...
    // errors: () => ...
};

export type DecisionFactory = <V = unknown>(
    input: unknown,
    resolver: <V>(ref: DecisionRef) => Decision<V>,
) => Decision<V>;

export type DecisionNameRef = {
    $name: DecisionName;
    index?: number;
};

export type DecisionUuidRef = {
    $uuid: DecisionId;
    index?: number;
};

export type DecisionRef = DecisionNameRef | DecisionUuidRef;

export type DecisionRefResolver = <V = unknown>(
    parent: DecisionContext,
    ref: DecisionRef,
) => Decision<V> | undefined;

export type DecisionModel<V = unknown, P = object> = {
    produce: (context: DecisionValueContext, params: P) => DecisionValue<V>;
    // explain: (params: P) =>
};

export type DecisionModelFactory<
    V = unknown,
    I extends DecisionInputBase = DecisionInputBase,
> = () => DecisionModel<V, I['params']>;

export type DecisionUnknown = Decision<unknown>;
