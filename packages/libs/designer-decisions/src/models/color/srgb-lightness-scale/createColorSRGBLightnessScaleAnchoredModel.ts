import {
    createSRGBLightnessScale,
    createSRGBLightnessValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorSRGBLightnessScaleAnchoredInput,
    DecisionModelFactory,
    SRGBLightnessScale,
} from '../../../types';

export const createColorSRGBLightnessScaleAnchoredModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createSRGBLightnessValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 1]);
            const values = series.map(item => createSRGBLightnessValue(valueContext, item));
            return createSRGBLightnessScale(valueContext, values);
        },
    };
};
