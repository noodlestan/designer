import { createSpaceScale, createSpaceValue } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleExplicitInput } from '../../../types';

export const createSpaceScaleExplicitModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createSpaceValue(context.nestedContext(), value, { quantize }),
            );

            return createSpaceScale(context, values);
        },
    };
};
