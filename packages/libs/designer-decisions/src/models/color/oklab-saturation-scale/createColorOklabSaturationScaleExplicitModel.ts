import { createOklabChromaScale, createOklabChromaValue } from '../../../primitives';
import type {
    ColorOklabChromaScaleExplicitInput,
    DecisionModelFactory,
    OklabChromaScale,
} from '../../../types';

export const createColorOklabChromaScaleExplicitModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createOklabChromaValue(valueContext, value));

            return createOklabChromaScale(valueContext, values);
        },
    };
};
