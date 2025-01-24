import { createSpaceValue } from '../../../primitives';
import {
    type DecisionModelFactory,
    type SpaceValue,
    type SpaceValueExplicitInput,
} from '../../../types';

export const createSpaceValueExplicitModel: DecisionModelFactory<
    SpaceValue,
    SpaceValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            return createSpaceValue(valueContext, params.value);
        },
    };
};
