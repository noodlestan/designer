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
        produce: (context, params) => {
            const anchorValue = createSRGBLightnessValue(context.nestedContext(), params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createSRGBLightnessValue(context.nestedContext(), item),
            );
            return createSRGBLightnessScale(context, values);
        },
    };
};
