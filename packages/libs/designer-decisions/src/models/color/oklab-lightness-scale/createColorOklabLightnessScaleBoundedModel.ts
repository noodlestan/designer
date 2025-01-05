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
import { createDecisionValue } from '../../../values';

export const createColorOklabLightnessScaleBoundedModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createOklabLightnessValue(valueContext, params.from);
            const toValue = createOklabLightnessValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createOklabLightnessValue(valueContext, item));
            const value = createOklabLightnessScale(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
