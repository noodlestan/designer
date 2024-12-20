import type { DecisionId, DecisionInputBase, DecisionName } from '../decision-inputs';

export type Value = unknown;
export type Params = object;

// export type Token<T extends Value> = {
//     decision: () => Decision<T>;
// };

export type DecisionContext = {
    owner: DecisionInputBase;
    contexts: DecisionContexts;
    resolve: DecisionRefResolver;
};

export type DecisionLookup = {
    ref: DecisionRef;
    decision: Decision<unknown>;
    lookups: DecisionLookup[];
};

export type DecisionValueRefResolver = <V = unknown>(ref: DecisionRef) => Decision<V> | undefined;

export type ValueContext = {
    contexts: DecisionContexts;
    lookups: DecisionLookup[];
    resolve: DecisionValueRefResolver;
};

export type PartialValueContext = Partial<Omit<ValueContext, 'resolver'>>;

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
    produce: (context?: PartialValueContext) => DecisionValue<V>;
    // token: () => Token<T> | undefined;
};

export type DecisionFactory = <V = unknown>(
    input: unknown,
    resolver: <V>(ref: DecisionRef) => Decision<V>,
) => Decision<V>;

export type DecisionRef =
    | {
          $name: DecisionName;
          contexts?: DecisionContexts;
      }
    | {
          $id: DecisionId;
      };

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
