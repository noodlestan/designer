import type { ColorFormat } from '@noodlestan/designer-decisions';

import type { ShowValueProps } from '../types';

export const resolveColorFormats = (value: ShowValueProps['value']): ColorFormat[] | null => {
    if (typeof value === 'boolean' && value) {
        return ['rgb'];
    }
    if (typeof value === 'string') {
        return [value as ColorFormat];
    }
    if (Array.isArray(value)) {
        return value as ColorFormat[];
    }
    return null;
};
