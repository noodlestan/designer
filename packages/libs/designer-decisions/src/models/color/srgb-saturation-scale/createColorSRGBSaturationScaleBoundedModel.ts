import {
    createSRGBSaturationScale,
    createSRGBSaturationValue,
    generateBoundedSeries,
} from '../../../primitives';
import {
    type ColorSRGBSaturationScaleBoundedInput,
    type DecisionModelFactory,
    type SRGBSaturationScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBSaturationScaleBoundedModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleBoundedInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createSRGBSaturationValue(valueContext, params.from);
            const toValue = createSRGBSaturationValue(valueContext, params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createSRGBSaturationValue(valueContext, item));
            const value = createSRGBSaturationScale(valueContext, [fromValue, ...values, toValue]);

            return createDecisionValue(valueContext, value);
        },
    };
};
