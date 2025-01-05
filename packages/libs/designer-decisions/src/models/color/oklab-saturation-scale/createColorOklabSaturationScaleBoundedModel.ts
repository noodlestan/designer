import {
    createOklabChromaScale,
    createOklabChromaValue,
    generateBoundedSeries,
} from '../../../primitives';
import {
    type ColorOklabChromaScaleBoundedInput,
    type DecisionModelFactory,
    type OklabChromaScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabChromaScaleBoundedModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createOklabChromaValue(valueContext, params.from);
            const toValue = createOklabChromaValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createOklabChromaValue(valueContext, item));
            const value = createOklabChromaScale(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
