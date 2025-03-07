import type { DecisionContext } from '../decision-context';
import type { DecisionRef } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { ValidatedRecord } from '../record';
import type { ParentValueContext } from '../value';
import type { BaseValue } from '../values';

export type DecisionUnknown = Decision<BaseValue<unknown>>;

export type Decision<V extends BaseValue<unknown>> = {
    context: () => DecisionContext;
    type: () => string;
    uuid: () => string | undefined;
    name: () => string;
    description: () => string | undefined;
    records: () => ValidatedRecord[];
    model: () => string; // WIP match contexts
    params: () => object; // WIP match contexts
    produce: (context?: LookupContexts | ParentValueContext) => V;
    // token: () => Token<T> | undefined;
};

export type DecisionFactory = <V = unknown>(
    input: unknown,
    resolver: <V extends BaseValue<unknown>>(ref: DecisionRef) => Decision<V>,
) => Decision<BaseValue<V>>;
