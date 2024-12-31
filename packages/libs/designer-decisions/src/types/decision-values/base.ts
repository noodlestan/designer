import type { DecisionId, DecisionInputBase, DecisionName } from '../decision-inputs';

export type Value = unknown;
export type Params = object;

// export type Token<T extends Value> = {
//     decision: () => Decision<T>;
// };

export type DecisionContext = {
    resolve: DecisionRefResolver;
    owner: DecisionInputBase;
    contexts: DecisionContexts;
};

export type DecisionLookup = {
    ref: DecisionRef;
    decision: Decision<unknown>;
};

export type DecisionValueRefResolver = <V = unknown>(ref: DecisionRef) => Decision<V> | undefined;

export type ValueError = {};

export type ValueContext = {
    resolve: DecisionValueRefResolver;
    contexts: DecisionContexts;
    parent?: ParentValueContext;
    children: ValueContext[];
    lookups: DecisionLookup[];
    errors: ValueError[];
};

export type ParentValueContext = Partial<Omit<ValueContext, 'resolver'>>;

export type DecisionContexts = {
    all: string[];
    any?: string[];
};

export type DecisionValue<V> = {
    value: () => V;
    maybeValue: () => V | undefined;
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
    produce: (context: ValueContext, params: P) => DecisionValue<V>;
    // explain: (params: P) =>
};

export type DecisionModelFactory<
    V = unknown,
    I extends DecisionInputBase = DecisionInputBase,
> = () => DecisionModel<V, I['params']>;

export type DecisionUnknown = Decision<unknown>;
