import { createSRGBHueSet, createSRGBHueValue, generateAnchoredSeries } from '../../../primitives';
import type {
    ColorSRGBHueSetAnchoredInput,
    DecisionModelFactory,
    SRGBHueSet,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBHueSetAnchoredModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createSRGBHueValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 1]);
            const values = series.map(item => createSRGBHueValue(valueContext, item));
            const value = createSRGBHueSet(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
