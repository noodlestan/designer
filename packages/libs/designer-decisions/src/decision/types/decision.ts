import type { DecisionInput, DecisionRef } from '../../inputs';
import type { LookupContexts } from '../../lookup';
import type { ParentValueContext } from '../../value';
import type { BaseValue } from '../../values';

import type { DecisionContext } from './context';

export type DecisionUnknown = Decision<BaseValue<unknown>>;

export type DecisionLookup = {
    ref: DecisionRef;
    context: DecisionContext;
    decision: DecisionUnknown | undefined;
};

export type Decision<V extends BaseValue<unknown>> = {
    type: () => string;
    uuid: () => string | undefined;
    name: () => string;
    description: () => string | undefined;
    inputs: () => DecisionInput[];
    input: () => DecisionInput; // WIP match contexts
    model: () => string; // WIP match contexts
    params: () => object; // WIP match contexts
    produce: (context?: LookupContexts | ParentValueContext) => V;
    // token: () => Token<T> | undefined;
};

export type DecisionFactory = <V = unknown>(
    input: unknown,
    resolver: <V extends BaseValue<unknown>>(ref: DecisionRef) => Decision<V>,
) => Decision<BaseValue<V>>;
