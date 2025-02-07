import { createOklabHueSet, createOklabHueValue, generateBoundedSeries } from '../../../primitives';
import {
    type ColorOklabHueSetBoundedInput,
    type DecisionModelFactory,
    type OklabHueSet,
} from '../../../types';

export const createColorOklabHueSetBoundedModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { precision } = params;

            const fromValue = createOklabHueValue(context.nestedContext(), params.from, {
                precision,
            });
            const toValue = createOklabHueValue(context.nestedContext(), params.to, { precision });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createOklabHueValue(context.nestedContext(), item, { precision }));
            return createOklabHueSet(context, [fromValue, ...values, toValue]);
        },
    };
};
