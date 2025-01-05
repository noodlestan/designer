import { createOklabChromaScale, createOklabChromaValue } from '../../../primitives';
import type {
    ColorOklabChromaScaleExplicitInput,
    DecisionModelFactory,
    OklabChromaScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabChromaScaleExplicitModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createOklabChromaValue(valueContext, value));

            const value = createOklabChromaScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
