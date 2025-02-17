import { type LookupContexts, isLookupContext } from '../../lookup';
import type { ParentValueContext } from '../types';

export function resolveLookupContext(
    context: LookupContexts | ParentValueContext | undefined,
): LookupContexts {
    return isLookupContext(context) ? context : context?.lookupContexts() || { all: [] };
}
