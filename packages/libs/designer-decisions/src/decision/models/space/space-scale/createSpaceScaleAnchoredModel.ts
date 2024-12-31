import {
    createSpaceScale,
    createSpaceValue,
    createSteppedNumberSeries,
} from '../../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleAnchoredInput } from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceScaleAnchoredModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const startValue = createSpaceValue(valueContext, params.anchor);
                const { value: anchor } = startValue.getValueWithUnits();

                const { before, after } = params;
                const beforeValues = before
                    ? createSteppedNumberSeries(anchor, before.steps, before.modifier, [0, 1])
                    : [];
                const afterValues = after
                    ? createSteppedNumberSeries(anchor, after.steps, after.modifier, [0, 1])
                    : [];

                return createSpaceScale(valueContext, [...beforeValues, anchor, ...afterValues]);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
