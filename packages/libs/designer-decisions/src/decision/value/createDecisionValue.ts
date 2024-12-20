import type { DecisionValue, ValueContext } from '../../types';
import type { BaseValue } from '../../types/primitive-values/base';

export const createDecisionValue = <T extends BaseValue<unknown>>(
    valueContext: ValueContext,
    value: () => T,
): DecisionValue<T> => {
    console.info(valueContext);

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
