import type { DecisionSource } from '@noodlestan/designer-decisions';

export function resolveSource(sourceOrPath: string | DecisionSource): DecisionSource {
    if (typeof sourceOrPath === 'string') {
        return { name: sourceOrPath, source: { type: 'path', path: sourceOrPath } };
    }
    return sourceOrPath;
}
