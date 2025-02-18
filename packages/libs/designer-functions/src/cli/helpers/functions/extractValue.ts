import type { BaseValue } from '@noodlestan/designer-decisions';

export const extractValue = (value?: BaseValue<unknown>): unknown => {
    if (
        typeof value === 'object' &&
        value !== null &&
        'get' in value &&
        typeof value.get === 'function'
    ) {
        return value.get();
    }
    return String(value);
};
