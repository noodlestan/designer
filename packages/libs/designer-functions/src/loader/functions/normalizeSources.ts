import type { DecisionSource } from '@noodlestan/designer-decisions';

export const normalizeSources = (sources: (DecisionSource | string)[]): DecisionSource[] => {
    return sources.map(source => {
        if (typeof source === 'string') {
            return { name: source, source: { type: 'path', path: source } };
        } else {
            return source;
        }
    });
};
