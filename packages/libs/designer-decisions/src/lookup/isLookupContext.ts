import type { LookupContexts } from './types';

export const isLookupContext = (contexts: unknown): contexts is LookupContexts => {
    return typeof contexts === 'object' && contexts !== null && 'all' in contexts;
};
