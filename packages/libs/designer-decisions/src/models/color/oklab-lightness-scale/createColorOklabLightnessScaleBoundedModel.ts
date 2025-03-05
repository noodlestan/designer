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
            const fromValue = createOklabLightnessValue(context, from, options);
            const toValue = createOklabLightnessValue(context, to, options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );
            const values = series.map(channel =>
                createOklabLightnessValue(context, channel, options),
            );

            return createOklabLightnessScale(context, values);
        },
    };
};
