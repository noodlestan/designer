import { isLookupContext } from './isLookupContext';
import type { ContextWithLookups, LookupContexts } from './types';

export function resolveLookupContext(
    contexts: LookupContexts | ContextWithLookups | undefined,
): LookupContexts {
    return isLookupContext(contexts) ? contexts : contexts?.lookupContexts() || { all: [] };
}
