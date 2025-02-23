import type { TextStyleVizComponent, TextStyleVizName } from '../types';
import { TypeShortTextViz } from '../viz';

export const getTextStyleVizComponent = (viz?: string | boolean): TextStyleVizComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const TEXT_STYLE_VIZ_COMPONENT_MAP: Record<TextStyleVizName, TextStyleVizComponent> = {
        'short-text': TypeShortTextViz,
    };

    const mapped = typeof viz === 'string' && TEXT_STYLE_VIZ_COMPONENT_MAP[viz as TextStyleVizName];

    return mapped || TypeShortTextViz;
};
