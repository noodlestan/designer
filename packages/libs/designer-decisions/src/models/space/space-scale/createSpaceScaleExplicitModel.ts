import { createSpaceScale, createSpaceValue } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleExplicitInput } from '../../../types';

export const createSpaceScaleExplicitModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createSpaceValue(valueContext, value));
            return createSpaceScale(valueContext, values);
        },
    };
};
