import type { ColorSRGBLightnessScaleBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import {
    type SRGBLightnessScale,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessScaleBoundedModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createSRGBLightnessValue(context.forValue(from), options);
            const toValue = createSRGBLightnessValue(context.forValue(to), options);

            const series = generateBoundedSeries(fromValue.toNumber(), toValue.toNumber(), steps);
            const values = series.map(channel =>
                createSRGBLightnessValue(context.forValue(channel), options),
            );

            return createSRGBLightnessScale(context.forValue(values));
        },
    };
};
