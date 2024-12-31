import { createSpaceValue } from '../../../../primitives';
import {
    type DecisionModelFactory,
    type SpaceValue,
    type SpaceValueExplicitInput,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createSpaceValueExplicitModel: DecisionModelFactory<
    SpaceValue,
    SpaceValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => createSpaceValue(valueContext, params.value);

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
