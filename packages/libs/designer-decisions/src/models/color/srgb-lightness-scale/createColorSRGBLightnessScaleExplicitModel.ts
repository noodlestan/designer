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
        produce: (context, params) => {
            const values = params.values.map(value =>
                createSRGBLightnessValue(context.nestedContext(), value),
            );

            return createSRGBLightnessScale(context, values);
        },
    };
};
