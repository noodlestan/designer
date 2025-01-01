import { createSpaceScale, createSpaceValue, generateAnchoredSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleAnchoredInput } from '../../../types';
import { createDecisionValue } from '../../../values';

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

            const value = createSpaceScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
