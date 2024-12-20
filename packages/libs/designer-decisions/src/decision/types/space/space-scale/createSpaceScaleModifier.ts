import { createSpaceScale, createSpaceValue } from '../../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleModifierInput } from '../../../../types';
import { createDecisionValue } from '../../../value';

export const createSpaceScaleModifier: DecisionModelFactory<
    SpaceScale,
    SpaceScaleModifierInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const start = createSpaceValue(valueContext, params.start);

                const values = Array(params.steps);
                values[0] = start;
                // WIP

                return createSpaceScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
