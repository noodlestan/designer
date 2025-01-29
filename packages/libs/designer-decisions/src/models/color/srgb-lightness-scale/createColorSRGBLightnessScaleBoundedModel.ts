import {
    createSRGBLightnessScale,
    createSRGBLightnessValue,
    generateBoundedSeries,
} from '../../../primitives';
import {
    type ColorSRGBLightnessScaleBoundedInput,
    type DecisionModelFactory,
    type SRGBLightnessScale,
} from '../../../types';

export const createColorSRGBLightnessScaleBoundedModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const fromValue = createSRGBLightnessValue(context.nestedContext(), params.from);
            const toValue = createSRGBLightnessValue(context.nestedContext(), params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createSRGBLightnessValue(context.nestedContext(), item));
            return createSRGBLightnessScale(context, [fromValue, ...values, toValue]);
        },
    };
};
