import { createSRGBLightnessScale, createSRGBLightnessValue } from '../../../primitives';
import type {
    ColorSRGBLightnessScaleExplicitInput,
    DecisionModelFactory,
    SRGBLightnessScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBLightnessScaleExplicitModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value =>
                createSRGBLightnessValue(valueContext, value),
            );

            const value = createSRGBLightnessScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
