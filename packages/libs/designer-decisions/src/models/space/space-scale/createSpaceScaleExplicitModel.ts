import { createSpaceScale, createSpaceValue } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleExplicitInput } from '../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceScaleExplicitModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createSpaceValue(valueContext, value));
            const value = createSpaceScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
