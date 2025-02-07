import { createSpaceScale, createSpaceValue, generateAnchoredSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleAnchoredInput } from '../../../types';

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
            const { value: anchor } = anchorValue.getObject();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(space =>
                createSpaceValue(context.nestedContext(), space, { quantize }),
            );

            return createSpaceScale(context, values);
        },
    };
};
