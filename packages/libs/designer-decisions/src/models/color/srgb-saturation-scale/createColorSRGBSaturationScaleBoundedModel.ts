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

export const createColorSRGBSaturationScaleBoundedModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const fromValue = createSRGBSaturationValue(context.nestedContext(), params.from);
            const toValue = createSRGBSaturationValue(context.nestedContext(), params.to);

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item =>
                createSRGBSaturationValue(context.nestedContext(), item),
            );
            return createSRGBSaturationScale(context, [fromValue, ...values, toValue]);
        },
    };
};
