import type { ColorVizComponent, ColorVizName } from '../types';
import { ColorBgViz, ColorFgViz, ColorSwatchViz } from '../viz';

export const getColorVizComponent = (viz?: string | boolean): ColorVizComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const COLOR_VIZ_COMPONENT_MAP: Record<ColorVizName, ColorVizComponent> = {
        swatch: ColorSwatchViz,
        fg: ColorFgViz,
        bg: ColorBgViz,
    };

    const mapped = typeof viz === 'string' && COLOR_VIZ_COMPONENT_MAP[viz as ColorVizName];

    return mapped || ColorSwatchViz;
};
