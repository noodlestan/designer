import { createOklabChromaValue } from '../../../primitives';
import {
    type ColorOklabChromaValueExplicitInput,
    type DecisionModelFactory,
    type OklabChromaValue,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabChromaValueExplicitModel: DecisionModelFactory<
    OklabChromaValue,
    ColorOklabChromaValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const value = createOklabChromaValue(valueContext, params.value);

            return createDecisionValue(valueContext, value);
        },
    };
};
