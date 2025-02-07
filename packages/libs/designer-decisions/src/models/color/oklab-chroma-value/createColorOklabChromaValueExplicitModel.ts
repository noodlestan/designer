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
        produce: (context, params) => {
            const { precision } = params;

            return createOklabChromaValue(context, params.value, { precision });
        },
    };
};
