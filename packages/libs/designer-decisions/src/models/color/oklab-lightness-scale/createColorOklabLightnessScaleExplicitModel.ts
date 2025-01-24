import { createOklabLightnessScale, createOklabLightnessValue } from '../../../primitives';
import type {
    ColorOklabLightnessScaleExplicitInput,
    DecisionModelFactory,
    OklabLightnessScale,
} from '../../../types';

export const createColorOklabLightnessScaleExplicitModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value =>
                createOklabLightnessValue(valueContext, value),
            );

            return createOklabLightnessScale(valueContext, values);
        },
    };
};
