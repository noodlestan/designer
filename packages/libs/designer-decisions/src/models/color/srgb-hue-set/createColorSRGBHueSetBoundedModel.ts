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
        produce: (valueContext, params) => {
            const fromValue = createSRGBHueValue(valueContext, params.from);
            const toValue = createSRGBHueValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createSRGBHueValue(valueContext, item));
            return createSRGBHueSet(valueContext, [fromValue, ...values, toValue]);
        },
    };
};
