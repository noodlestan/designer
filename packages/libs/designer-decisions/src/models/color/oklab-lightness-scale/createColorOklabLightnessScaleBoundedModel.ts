import {
    createOklabLightnessScale,
    createOklabLightnessValue,
    generateBoundedSeries,
} from '../../../primitives';
import {
    type ColorOklabLightnessScaleBoundedInput,
    type DecisionModelFactory,
    type OklabLightnessScale,
} from '../../../types';

export const createColorOklabLightnessScaleBoundedModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const fromValue = createOklabLightnessValue(context.nestedContext(), params.from);
            const toValue = createOklabLightnessValue(context.nestedContext(), params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createOklabLightnessValue(context.nestedContext(), item));
            return createOklabLightnessScale(context, [fromValue, ...values, toValue]);
        },
    };
};
