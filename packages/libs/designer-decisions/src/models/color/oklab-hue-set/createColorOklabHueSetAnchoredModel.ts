import {
    createOklabHueSet,
    createOklabHueValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorOklabHueSetAnchoredInput,
    DecisionModelFactory,
    OklabHueSet,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabHueSetAnchoredModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createOklabHueValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 360]);
            const values = series.map(item => createOklabHueValue(valueContext, item));
            const value = createOklabHueSet(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
