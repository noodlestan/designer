import {
    createInterpolatedNumberSeries,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
} from '../../../../primitives';
import {
    type ColorSRGBLightnessScaleBoundedInput,
    type DecisionModelFactory,
    type SRGBLightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBLightnessScaleBoundedModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const fromValue = createSRGBLightnessValue(valueContext, params.from);
                const toValue = createSRGBLightnessValue(valueContext, params.to);

                const from = fromValue.get();
                const to = toValue.get();
                const values = createInterpolatedNumberSeries(from, to, params.steps);
                return createSRGBLightnessScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
