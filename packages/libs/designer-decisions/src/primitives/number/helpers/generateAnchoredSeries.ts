import type { AnchoredNumberSeriesParams, NumberClamp } from '../../../types';

import { generateNumberSeries } from './generateNumberSeries';
import { nearest } from './nearest';

export const generateAnchoredSeries = (
    anchor: number = 0,
    params: AnchoredNumberSeriesParams = {},
    clamp?: NumberClamp,
    precision: number = 0,
): number[] => {
    const { steps: beforeSteps = 0, modifier: beforeMod } = params.before || {};
    const before = generateNumberSeries(anchor, beforeSteps + 1, beforeMod, clamp, precision);

    const { steps: afterSteps = 0, modifier: afterMod } = params.after || {};
    const after = generateNumberSeries(anchor, afterSteps + 1, afterMod, clamp, precision);

    return [...before.splice(1).reverse(), nearest(anchor, precision), ...after.splice(1)];
};
