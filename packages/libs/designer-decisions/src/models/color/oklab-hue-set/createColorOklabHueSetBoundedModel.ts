import type { ColorOklabHueSetBoundedInput } from '../../../inputs';
import {
    type OklabHueSet,
    createOklabHueSet,
    createOklabHueValue,
    generateBoundedSeries,
} from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueSetBoundedModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createOklabHueValue(context.nestedContext(), params.from, {
                quantize,
            });
            const toValue = createOklabHueValue(context.nestedContext(), params.to, { quantize });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createOklabHueValue(context.nestedContext(), item, { quantize }));
            return createOklabHueSet(context, [fromValue, ...values, toValue]);
        },
    };
};
