import { createOklabChromaValue } from '../../../primitives';
import {
    type ColorOklabChromaValueExplicitInput,
    type DecisionModelFactory,
    type OklabChromaValue,
} from '../../../types';

export const createColorOklabChromaValueExplicitModel: DecisionModelFactory<
    OklabChromaValue,
    ColorOklabChromaValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            return createOklabChromaValue(valueContext, params.value);
        },
    };
};
