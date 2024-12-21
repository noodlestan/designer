import { createSpaceScale, createSpaceValue } from '../../../../primitives';
import type {
    DecisionModelFactory,
    SpaceScale,
    SpaceScaleLinearRangeInput,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceScaleLinearRange: DecisionModelFactory<
    SpaceScale,
    SpaceScaleLinearRangeInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const from = createSpaceValue(valueContext, params.from);
                const to = createSpaceValue(valueContext, params.to);

                const values = Array(params.steps);
                values[0] = from;
                // WIP
                values[params.steps - 1] = to;

                return createSpaceScale(valueContext, values);
            };

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
