import type { SpaceVizComponent } from '../types';
import { SpaceCircleViz, SpaceHorizontalBarViz, SpaceSquareViz, SpaceVerticalBarViz } from '../viz';

export const getSpaceVizComponent = (viz?: string | boolean): SpaceVizComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const DECISION_TYPE_COMPONENT_MAP: Record<string, SpaceVizComponent> = {
        square: SpaceSquareViz,
        circle: SpaceCircleViz,
        'bar-h': SpaceHorizontalBarViz,
        'bar-v': SpaceVerticalBarViz,
    };

    return (typeof viz === 'string' && DECISION_TYPE_COMPONENT_MAP[viz]) || SpaceHorizontalBarViz;
};
