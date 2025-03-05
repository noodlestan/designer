import { createItemSet } from '../../../primitives';
import type { ValueContext } from '../../../value';
import { createBaseValue } from '../base-value';

import type { BaseSet } from './types';

export const createBaseSet = <T>(context: ValueContext, input: T[]): BaseSet<T> => {
    const get = () => createItemSet(input);

    return createBaseValue(context, get);
};
