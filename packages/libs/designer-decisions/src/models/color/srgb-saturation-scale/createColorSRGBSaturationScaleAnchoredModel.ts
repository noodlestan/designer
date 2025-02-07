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
            const { quantize } = params;

            const anchorValue = createSRGBSaturationValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createSRGBSaturationValue(context.nestedContext(), item, { quantize }),
            );
            return createSRGBSaturationScale(context, values);
        },
    };
};
