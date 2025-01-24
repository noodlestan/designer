import { createSRGBLightnessScale, createSRGBLightnessValue } from '../../../primitives';
import type {
    ColorSRGBLightnessScaleExplicitInput,
    DecisionModelFactory,
    SRGBLightnessScale,
} from '../../../types';

export const createColorSRGBLightnessScaleExplicitModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value =>
                createSRGBLightnessValue(valueContext, value),
            );

            return createSRGBLightnessScale(valueContext, values);
        },
    };
};
