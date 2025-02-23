import type { SizeVizComponent, SizeVizName } from '../types';
import { SizeCircleViz, SizeHorizontalBarViz, SizeSquareViz, SizeVerticalBarViz } from '../viz';

export const getSizeVizComponent = (viz?: string | boolean): SizeVizComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const SIZE_VIZ_COMPONENT_MAP: Record<SizeVizName, SizeVizComponent> = {
        square: SizeSquareViz,
        circle: SizeCircleViz,
        'bar-h': SizeHorizontalBarViz,
        'bar-v': SizeVerticalBarViz,
    };

    const mapped = typeof viz === 'string' && SIZE_VIZ_COMPONENT_MAP[viz as SizeVizName];

    return mapped || SizeHorizontalBarViz;
};
