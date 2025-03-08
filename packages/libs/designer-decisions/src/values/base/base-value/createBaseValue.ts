import { isObject } from '../../../private';
import type { ValueContext } from '../../../value';

import type { BaseValue } from './types';

export const createBaseValue = <T extends object = object>(
    context: ValueContext,
    get: () => T,
): T & BaseValue<T> => {
    const primitive = get();

    if (!isObject(primitive)) {
        throw new Error(`Primitive must be an object. Received: ${typeof primitive}`);
    }

    return {
        ...primitive,
        type: () => context.modelContext().decisionType(),
        context: () => context,
        get: () => primitive,
    };
};
