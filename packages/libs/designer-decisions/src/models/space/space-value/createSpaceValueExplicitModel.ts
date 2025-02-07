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
        produce: (context, params) => {
            const { precision } = params;
            return createSpaceValue(context, params.value, { precision });
        },
    };
};
