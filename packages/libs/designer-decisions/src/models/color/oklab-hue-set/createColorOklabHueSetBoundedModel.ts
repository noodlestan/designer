import { createOklabHueSet, createOklabHueValue, generateBoundedSeries } from '../../../primitives';
import {
    type ColorOklabHueSetBoundedInput,
    type DecisionModelFactory,
    type OklabHueSet,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabHueSetBoundedModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createOklabHueValue(valueContext, params.from);
            const toValue = createOklabHueValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createOklabHueValue(valueContext, item));
            const value = createOklabHueSet(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
