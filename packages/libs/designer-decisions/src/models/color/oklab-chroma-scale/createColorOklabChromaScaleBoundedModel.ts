import type { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import {
    type OklabChromaScale,
    createOklabChromaScale,
    createOklabChromaValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabChromaScaleBoundedModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createOklabChromaValue(context.forValue(from), options);
            const toValue = createOklabChromaValue(context.forValue(to), options);

            const series = generateBoundedSeries(fromValue.toNumber(), toValue.toNumber(), steps);
            const values = series.map(channel =>
                createOklabChromaValue(context.forValue(channel), options),
            );

            return createOklabChromaScale(context.forValue(values));
        },
    };
};
