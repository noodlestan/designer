import type { ColorSRGBSaturationScaleBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import {
    type SRGBSaturationScale,
    createSRGBSaturationScale,
    createSRGBSaturationValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBSaturationScaleBoundedModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createSRGBSaturationValue(context, from, options);
            const toValue = createSRGBSaturationValue(context, to, options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );
            const values = series.map(channel =>
                createSRGBSaturationValue(context, channel, options),
            );

            return createSRGBSaturationScale(context, values);
        },
    };
};
