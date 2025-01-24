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
        produce: (context, params) => {
            const anchorValue = createSRGBSaturationValue(context.nestedContext(), params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 1]);
            const values = series.map(item =>
                createSRGBSaturationValue(context.nestedContext(), item),
            );
            return createSRGBSaturationScale(context, values);
        },
    };
};
