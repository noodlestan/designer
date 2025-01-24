import { createSpaceScale, createSpaceValue, generateAnchoredSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleAnchoredInput } from '../../../types';

export const createSpaceScaleAnchoredModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createSpaceValue(valueContext, params.anchor);
            const { value: anchor } = anchorValue.getValueWithUnits();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(space => createSpaceValue(valueContext, space));

            return createSpaceScale(valueContext, values);
        },
    };
};
