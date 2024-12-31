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
import { createDecisionValue } from '../../../values';

export const createColorSRGBLightnessScaleBoundedModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createSRGBLightnessValue(valueContext, params.from);
            const toValue = createSRGBLightnessValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createSRGBLightnessValue(valueContext, item));
            const value = createSRGBLightnessScale(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
