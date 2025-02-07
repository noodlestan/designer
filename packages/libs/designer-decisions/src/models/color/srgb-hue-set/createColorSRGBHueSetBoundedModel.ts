import { createSRGBHueSet, createSRGBHueValue, generateBoundedSeries } from '../../../primitives';
import {
    type ColorSRGBHueSetBoundedInput,
    type DecisionModelFactory,
    type SRGBHueSet,
} from '../../../types';

export const createColorSRGBHueSetBoundedModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createSRGBHueValue(context.nestedContext(), params.from, {
                quantize,
            });
            const toValue = createSRGBHueValue(context.nestedContext(), params.to, { quantize });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createSRGBHueValue(context.nestedContext(), item, { quantize }));
            return createSRGBHueSet(context, [fromValue, ...values, toValue]);
        },
    };
};
