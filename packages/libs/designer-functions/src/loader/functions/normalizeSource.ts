import type { DecisionSource } from '@noodlestan/designer-decisions';

export const normalizeSource = (source: DecisionSource | string): DecisionSource => {
    if (typeof source === 'string') {
        return { name: source, source: { type: 'path', path: source } };
    } else {
        return source;
    }
};
