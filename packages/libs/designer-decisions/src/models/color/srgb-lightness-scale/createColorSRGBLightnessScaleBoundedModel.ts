import type { ColorSRGBLightnessScaleBoundedInput } from '../../../inputs';
import {
    type SRGBLightnessScale,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
    generateBoundedSeries,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessScaleBoundedModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createSRGBLightnessValue(context.nestedContext(), params.from, {
                quantize,
            });
            const toValue = createSRGBLightnessValue(context.nestedContext(), params.to, {
                quantize,
            });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createSRGBLightnessValue(context.nestedContext(), item, { quantize }));
            return createSRGBLightnessScale(context, [fromValue, ...values, toValue]);
        },
    };
};
