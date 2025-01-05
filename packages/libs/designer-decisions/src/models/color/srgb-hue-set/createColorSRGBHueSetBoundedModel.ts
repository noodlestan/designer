import { createSRGBHueSet, createSRGBHueValue, generateBoundedSeries } from '../../../primitives';
import {
    type ColorSRGBHueSetBoundedInput,
    type DecisionModelFactory,
    type SRGBHueSet,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBHueSetBoundedModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createSRGBHueValue(valueContext, params.from);
            const toValue = createSRGBHueValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createSRGBHueValue(valueContext, item));
            const value = createSRGBHueSet(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
