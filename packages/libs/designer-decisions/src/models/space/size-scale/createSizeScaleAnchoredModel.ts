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
            const { value: anchorValue, unit } = createSizeValue(context, anchor, options).get();

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(size =>
                createSizeValue(context, { value: size, unit }, { quantize }),
            );

            return createSizeScale(context, values);
        },
    };
};
