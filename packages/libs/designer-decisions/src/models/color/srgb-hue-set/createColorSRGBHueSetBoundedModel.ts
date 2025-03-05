import type { ColorSRGBHueSetBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import { type SRGBHueSet, createSRGBHueSet, createSRGBHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBHueSetBoundedModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createSRGBHueValue(context, from, options);
            const toValue = createSRGBHueValue(context, to, options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );
            const values = series.map(channel => createSRGBHueValue(context, channel, options));

            return createSRGBHueSet(context, values);
        },
    };
};
