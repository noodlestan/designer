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
            const fromValue = createOklabChromaValue(context, from, options);
            const toValue = createOklabChromaValue(context, to, options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );
            const values = series.map(channel => createOklabChromaValue(context, channel, options));

            return createOklabChromaScale(context, values);
        },
    };
};
