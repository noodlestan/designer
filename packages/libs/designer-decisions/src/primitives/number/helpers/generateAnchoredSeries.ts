import type { AnchoredNumberSeriesParams } from '../../../types';

import { generateModifierSeries } from './functions';

export const generateAnchoredSeries = (
    anchor: number,
    params: AnchoredNumberSeriesParams,
    clamp?: [number, number],
    precision: number = 2,
): number[] => {
    const { steps: beforeSteps = 0, modifier: beforeMod } = params.before || {};
    const before = generateModifierSeries(anchor, beforeSteps + 1, beforeMod, clamp, precision);

    const { steps: afterSteps = 0, modifier: afterMod } = params.after || {};
    const after = generateModifierSeries(anchor, afterSteps + 1, afterMod, clamp, precision);

    return [...before.splice(1).reverse(), anchor, ...after.splice(1)];
};
