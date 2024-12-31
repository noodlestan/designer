import { createSpaceScale } from '../../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleExplicitInput } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceScaleExplicitModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                return createSpaceScale(valueContext, params.values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
