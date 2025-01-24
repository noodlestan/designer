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
            const fromValue = createOklabHueValue(context.nestedContext(), params.from);
            const toValue = createOklabHueValue(context.nestedContext(), params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createOklabHueValue(context.nestedContext(), item));
            return createOklabHueSet(context, [fromValue, ...values, toValue]);
        },
    };
};
