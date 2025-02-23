import type { ValueContext } from '../../../value';
import { createItemSet } from '../../primitives';
import { createBaseValue } from '../base-value';

import type { BaseSet } from './types';

export const createBaseSet = <T>(context: ValueContext, input: T[]): BaseSet<T> => {
    const baseValue = createBaseValue(context, input);
    const items = createItemSet(input);

    return {
        ...baseValue,
        get: () => items,
    };
};
