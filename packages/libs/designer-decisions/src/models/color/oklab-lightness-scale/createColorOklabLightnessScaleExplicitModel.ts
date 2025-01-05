import { createOklabLightnessScale, createOklabLightnessValue } from '../../../primitives';
import type {
    ColorOklabLightnessScaleExplicitInput,
    DecisionModelFactory,
    OklabLightnessScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabLightnessScaleExplicitModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value =>
                createOklabLightnessValue(valueContext, value),
            );

            const value = createOklabLightnessScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
