import {
    createNumberSteppedSeries,
    createSpaceScale,
    createSpaceValue,
} from '../../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleModifierInput } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceScaleModifier: DecisionModelFactory<
    SpaceScale,
    SpaceScaleModifierInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const startValue = createSpaceValue(valueContext, params.start);

                const { value: start } = startValue.getValueWithUnits();
                const values = createNumberSteppedSeries(start, params.steps, params.modifier);
                return createSpaceScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
