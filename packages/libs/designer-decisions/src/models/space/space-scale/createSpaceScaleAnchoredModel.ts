import type { SpaceScaleAnchoredInput } from '../../../inputs';
import {
    type SpaceScale,
    createSpaceScale,
    createSpaceValue,
    generateAnchoredSeries,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSpaceScaleAnchoredModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const anchorValue = createSpaceValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const { value: anchor } = anchorValue.toObject();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(space =>
                createSpaceValue(context.nestedContext(), space, { quantize }),
            );

            return createSpaceScale(context, values);
        },
    };
};
