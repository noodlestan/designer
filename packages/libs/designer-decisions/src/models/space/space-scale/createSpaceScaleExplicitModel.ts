import type { SpaceScaleExplicitInput } from '../../../inputs';
import { type SpaceScale, createSpaceScale, createSpaceValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

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
