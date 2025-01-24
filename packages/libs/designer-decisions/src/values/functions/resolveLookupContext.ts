import { isLookupContext } from '../../context';
import type { LookupContexts, ParentValueContext } from '../../types';

export function resolveLookupContext(
    context: LookupContexts | ParentValueContext | undefined,
): LookupContexts {
    return isLookupContext(context) ? context : context?.lookupContexts() || { all: [] };
}
