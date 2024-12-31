import type { BaseValue, DecisionValue, DecisionValueContext } from '../types';

export const createDecisionValue = <T extends BaseValue<unknown>>(
    context: DecisionValueContext,
    value: T,
): DecisionValue<T> => {
    const hasErrors = () => Boolean(context.errors().length);
    const errors = () => context.errors();

    return {
        hasErrors,
        errors,
        value: () => value,
    };
};
