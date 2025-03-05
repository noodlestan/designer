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
            const fromValue = createOklabHueValue(context, from, options);
            const toValue = createOklabHueValue(context, to, options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );
            const values = series.map(channel => createOklabHueValue(context, channel, options));

            return createOklabHueSet(context, values);
        },
    };
};
