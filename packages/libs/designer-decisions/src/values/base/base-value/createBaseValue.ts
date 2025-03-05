import type { ValueContext } from '../../../value';

import type { BaseValue } from './types';

export const createBaseValue = <T>(context: ValueContext, get: () => T): BaseValue<T> => {
    const state: { primitive?: T } = {};

    const getPrimitive = (): T => {
        if ('primitive' in state) {
            return state.primitive as T;
        }
        state.primitive = get();
        return state.primitive;
    };

    return {
        type: () => context.decisionContext().decisionType(),
        context: () => {
            getPrimitive();
            return context;
        },
        get: getPrimitive,
    };
};
