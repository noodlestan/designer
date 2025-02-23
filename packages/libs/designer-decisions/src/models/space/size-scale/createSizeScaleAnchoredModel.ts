import type { SizeScaleAnchoredInput } from '../../../inputs';
import {
    type SizeScale,
    createSizeScale,
    createSizeValue,
    generateAnchoredSeries,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeScaleAnchoredModel: DecisionModelFactory<
    SizeScale,
    SizeScaleAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const anchorValue = createSizeValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const { value: anchor } = anchorValue.toObject();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(size =>
                createSizeValue(context.nestedContext(), size, { quantize }),
            );

            return createSizeScale(context, values);
        },
    };
};
