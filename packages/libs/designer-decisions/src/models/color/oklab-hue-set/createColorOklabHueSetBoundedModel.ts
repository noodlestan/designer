import type { ColorOklabHueSetBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import { type OklabHueSet, createOklabHueSet, createOklabHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueSetBoundedModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createOklabHueValue(context.forValue(from), options);
            const toValue = createOklabHueValue(context.forValue(to), options);

            const series = generateBoundedSeries(fromValue.toNumber(), toValue.toNumber(), steps);
            const values = series.map(channel =>
                createOklabHueValue(context.forValue(channel), options),
            );

            return createOklabHueSet(context.forValue(values));
        },
    };
};
