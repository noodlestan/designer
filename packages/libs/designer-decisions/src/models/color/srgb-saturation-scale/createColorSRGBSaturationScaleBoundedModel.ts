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
            const { precision } = params;

            const fromValue = createSRGBSaturationValue(context.nestedContext(), params.from, {
                precision,
            });
            const toValue = createSRGBSaturationValue(context.nestedContext(), params.to, {
                precision,
            });

            const from = fromValue.get();
            const to = toValue.get();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item =>
                    createSRGBSaturationValue(context.nestedContext(), item, { precision }),
                );
            return createSRGBSaturationScale(context, [fromValue, ...values, toValue]);
        },
    };
};
