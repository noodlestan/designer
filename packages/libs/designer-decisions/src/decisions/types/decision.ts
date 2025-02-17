import type { DecisionRef, InputRecord } from '../../inputs';
import type { LookupContexts } from '../../lookup';
import type { BaseValue } from '../../primitives';
import type { ParentValueContext } from '../../values';

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
    inputs: () => InputRecord[];
    input: () => InputRecord; // WIP match contexts
    model: () => string; // WIP match contexts
    params: () => object; // WIP match contexts
    produce: (context?: LookupContexts | ParentValueContext) => V;
    // token: () => Token<T> | undefined;
};

export type DecisionFactory = <V = unknown>(
    input: unknown,
    resolver: <V extends BaseValue<unknown>>(ref: DecisionRef) => Decision<V>,
) => Decision<BaseValue<V>>;
