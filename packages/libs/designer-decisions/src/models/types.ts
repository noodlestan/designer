import type { DecisionInput } from '../inputs';
import type { ValueContext } from '../value';
import type { BaseValue } from '../values';

export type DecisionModel<V = BaseValue<unknown>, P extends object = object> = {
    produce: (context: ValueContext<P>) => V;
};

export type DecisionModelFactory<
    V = BaseValue<unknown>,
    I extends DecisionInput = DecisionInput,
> = () => DecisionModel<V, I['params']>;
