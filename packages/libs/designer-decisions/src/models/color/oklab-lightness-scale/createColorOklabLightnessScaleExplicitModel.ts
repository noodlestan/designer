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
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createOklabLightnessValue(context.nestedContext(), value, { quantize }),
            );

            return createOklabLightnessScale(context, values);
        },
    };
};
