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
            const { quantize } = params;

            const values = params.values.map(value =>
                createSRGBLightnessValue(context.nestedContext(), value, { quantize }),
            );

            return createSRGBLightnessScale(context, values);
        },
    };
};
