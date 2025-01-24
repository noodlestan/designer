import {
    createSRGBSaturationScale,
    createSRGBSaturationValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorSRGBSaturationScaleAnchoredInput,
    DecisionModelFactory,
    SRGBSaturationScale,
} from '../../../types';

export const createColorSRGBSaturationScaleAnchoredModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createSRGBSaturationValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 1]);
            const values = series.map(item => createSRGBSaturationValue(valueContext, item));
            return createSRGBSaturationScale(valueContext, values);
        },
    };
};
