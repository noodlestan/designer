import { createSRGBHueSet, createSRGBHueValue, generateAnchoredSeries } from '../../../primitives';
import type {
    ColorSRGBHueSetAnchoredInput,
    DecisionModelFactory,
    SRGBHueSet,
} from '../../../types';

export const createColorSRGBHueSetAnchoredModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createSRGBHueValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 360]);
            const values = series.map(item => createSRGBHueValue(valueContext, item));
            return createSRGBHueSet(valueContext, values);
        },
    };
};
