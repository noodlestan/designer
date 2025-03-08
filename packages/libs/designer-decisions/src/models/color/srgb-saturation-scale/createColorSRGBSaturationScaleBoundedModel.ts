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
            const fromValue = createSRGBSaturationValue(context.forValue(from), options);
            const toValue = createSRGBSaturationValue(context.forValue(to), options);

            const series = generateBoundedSeries(fromValue.toNumber(), toValue.toNumber(), steps);
            const values = series.map(channel =>
                createSRGBSaturationValue(context.forValue(channel), options),
            );

            return createSRGBSaturationScale(context.forValue(values));
        },
    };
};
