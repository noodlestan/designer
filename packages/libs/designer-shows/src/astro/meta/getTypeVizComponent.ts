import type { TypeVizComponent, TypeVizName } from '../types';
import { TypeShortTextViz } from '../viz';

export const getTypeVizComponent = (viz?: string | boolean): TypeVizComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const TYPE_VIZ_COMPONENT_MAP: Record<TypeVizName, TypeVizComponent> = {
        'short-text': TypeShortTextViz,
    };

    const mapped = typeof viz === 'string' && TYPE_VIZ_COMPONENT_MAP[viz as TypeVizName];

    return mapped || TypeShortTextViz;
};
