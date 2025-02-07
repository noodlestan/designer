import { createSpaceScale, createSpaceValue } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleExplicitInput } from '../../../types';

export const createSpaceScaleExplicitModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { precision } = params;

            const values = params.values.map(value =>
                createSpaceValue(context.nestedContext(), value, { precision }),
            );

            return createSpaceScale(context, values);
        },
    };
};
