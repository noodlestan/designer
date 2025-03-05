import type { AnchoredNumberSeriesParams, NumberClamp } from '../../../inputs';

import { generateNumberSeries } from './generateNumberSeries';
import { quantized } from './quantized';

export const generateAnchoredSeries = (
    anchor: number = 0,
    params: AnchoredNumberSeriesParams = {},
    clamp?: NumberClamp,
    quantize: number = 0,
): number[] => {
    const { steps: beforeSteps = 0, modifier: beforeMod } = params.before || {};
    const before = generateNumberSeries(anchor, beforeSteps + 1, beforeMod, clamp, quantize);

    const { steps: afterSteps = 0, modifier: afterMod } = params.after || {};
    const after = generateNumberSeries(anchor, afterSteps + 1, afterMod, clamp, quantize);

    return [...before.splice(1).reverse(), quantized(anchor, quantize), ...after.splice(1)];
};
