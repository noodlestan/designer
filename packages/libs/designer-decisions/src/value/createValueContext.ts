import { type LookupContexts, resolveLookupContext } from '../lookup';
import type { LinkedModelContext } from '../model';
import { isObject } from '../private';

import { createValueContextPrivate } from './functions';
import type { ParentValueContext, ValueContext } from './types';

export const createValueContext = <I>(
    modelContext: LinkedModelContext,
    input?: I | undefined,
    context?: LookupContexts | ParentValueContext,
): ValueContext<I> => {
    const lookupContexts = resolveLookupContext(context);
    const parent = isObject(context) && 'childContext' in context ? context : undefined;
    if (parent) {
        return parent.childContext(input);
    }

    return createValueContextPrivate(modelContext, input, lookupContexts);
};
