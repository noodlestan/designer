import type { SizeScaleAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import { type SizeScale, createSizeScale, createSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeScaleAnchoredModel: DecisionModelFactory<
    SizeScale,
    SizeScaleAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue, unit } = createSizeValue(
                context.forValue(anchor),
                options,
            ).get();

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(size =>
                createSizeValue(context.forValue({ value: size, unit }), options),
            );

            return createSizeScale(context.forValue(values));
        },
    };
};
