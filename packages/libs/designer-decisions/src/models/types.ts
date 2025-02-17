import type { InputRecord } from '../inputs';
import type { BaseValue } from '../primitives';
import type { ValueContext } from '../values';

export type DecisionModel<V = BaseValue<unknown>, P = object> = {
    produce: (context: ValueContext, params: P) => V;
};

export type DecisionModelFactory<
    V = BaseValue<unknown>,
    I extends InputRecord = InputRecord,
> = () => DecisionModel<V, I['params']>;
