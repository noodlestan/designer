import type { SpaceValueExplicitInput } from '../../../inputs';
import { type SpaceValue, createSpaceValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createSpaceValueExplicitModel: DecisionModelFactory<
    SpaceValue,
    SpaceValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;
            return createSpaceValue(context, params.value, { quantize });
        },
    };
};
