import { createSpaceScale, createSpaceValue, generateAnchoredSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleAnchoredInput } from '../../../types';

export const createSpaceScaleAnchoredModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const { precision } = params;

            const anchorValue = createSpaceValue(context.nestedContext(), params.anchor, {
                precision,
            });
            const { value: anchor } = anchorValue.getValueWithUnits();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(space =>
                createSpaceValue(context.nestedContext(), space, { precision }),
            );

            return createSpaceScale(context, values);
        },
    };
};
