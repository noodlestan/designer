import type { ColorSRGBLightnessScaleAnchoredInput } from '../../../inputs';
import {
    type SRGBLightnessScale,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessScaleAnchoredModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const anchorValue = createSRGBLightnessValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createSRGBLightnessValue(context.nestedContext(), item, { quantize }),
            );
            return createSRGBLightnessScale(context, values);
        },
    };
};
