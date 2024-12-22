import type { BaseValue, DecisionValue, ValueContext } from '../../types';

export const createDecisionValue = <T extends BaseValue<unknown>>(
    valueContext: ValueContext,
    value: () => T,
): DecisionValue<T> => {
    const v = value();

    return {
        value: () => {
            if (v === undefined) {
                throw new Error();
            }
            return v;
        },
        maybeValue: () => v,
    };
};
