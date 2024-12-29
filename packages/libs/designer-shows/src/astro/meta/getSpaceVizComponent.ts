import type { SpaceVizComponent, SpaceVizName } from '../types';
import { SpaceCircleViz, SpaceHorizontalBarViz, SpaceSquareViz, SpaceVerticalBarViz } from '../viz';

export const getSpaceVizComponent = (viz?: string | boolean): SpaceVizComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const SPACE_VIZ_COMPONENT_MAP: Record<SpaceVizName, SpaceVizComponent> = {
        square: SpaceSquareViz,
        circle: SpaceCircleViz,
        'bar-h': SpaceHorizontalBarViz,
        'bar-v': SpaceVerticalBarViz,
    };

    const mapped = typeof viz === 'string' && SPACE_VIZ_COMPONENT_MAP[viz as SpaceVizName];

    return mapped || SpaceHorizontalBarViz;
};
