import type { ColorOklabLightnessScaleBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import {
    type OklabLightnessScale,
    createOklabLightnessScale,
    createOklabLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessScaleBoundedModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createOklabLightnessValue(context.forValue(from), options);
            const toValue = createOklabLightnessValue(context.forValue(to), options);

            const series = generateBoundedSeries(fromValue.toNumber(), toValue.toNumber(), steps);
            const values = series.map(channel =>
                createOklabLightnessValue(context.forValue(channel), options),
            );

            return createOklabLightnessScale(context.forValue(values));
        },
    };
};
