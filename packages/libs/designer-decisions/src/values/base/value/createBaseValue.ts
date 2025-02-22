import type { ValueContext } from '../../../value';

import type { BaseValue } from './types';

export const createBaseValue = <T>(context: ValueContext, input: T): BaseValue<T> => {
    context.consume(input);

    return {
        type: () => context.decisionContext().decisionType(),
        context: () => context,
        get: () => input,
    };
};
