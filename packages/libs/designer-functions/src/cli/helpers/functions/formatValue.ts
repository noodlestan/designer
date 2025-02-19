import type { BaseValue } from '@noodlestan/designer-decisions';

import { extractValue } from './extractValue';

export const formatValue = (value?: BaseValue<unknown>): string => {
    const v = extractValue(value);
    if (typeof v === 'object' && v !== null && 'items' in v && typeof v.items === 'function') {
        const items = v.items()?.map(formatValue);
        return `[${items?.join(', ')}]`;
    }
    if (
        typeof v === 'object' &&
        v !== null &&
        'toString' in v &&
        typeof v.toString === 'function'
    ) {
        return v.toString();
    }
    return String(v);
};
