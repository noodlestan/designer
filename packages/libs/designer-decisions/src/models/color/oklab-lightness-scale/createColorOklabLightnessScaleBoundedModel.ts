import type { ColorOklabLightnessScaleBoundedInput } from '../../../inputs';
import {
    type OklabLightnessScale,
    createOklabLightnessScale,
    createOklabLightnessValue,
    generateBoundedSeries,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessScaleBoundedModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createOklabLightnessValue(context.nestedContext(), params.from, {
                quantize,
            });
            const toValue = createOklabLightnessValue(context.nestedContext(), params.to, {
                quantize,
            });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item =>
                    createOklabLightnessValue(context.nestedContext(), item, { quantize }),
                );
            return createOklabLightnessScale(context, [fromValue, ...values, toValue]);
        },
    };
};
