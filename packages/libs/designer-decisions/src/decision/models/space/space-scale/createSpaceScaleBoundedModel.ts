import {
    createInterpolatedNumberSeries,
    createSpaceScale,
    createSpaceValue,
} from '../../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleLinearBounded } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceScaleBoundedModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleLinearBounded
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const fromValue = createSpaceValue(valueContext, params.from);
                const toValue = createSpaceValue(valueContext, params.to);

                const { value: from } = fromValue.getValueWithUnits();
                const { value: to } = toValue.getValueWithUnits();
                const values = createInterpolatedNumberSeries(from, to, params.steps);

                return createSpaceScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
