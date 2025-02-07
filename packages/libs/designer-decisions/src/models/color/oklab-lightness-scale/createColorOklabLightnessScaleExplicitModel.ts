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
            const { precision } = params;

            const values = params.values.map(value =>
                createOklabLightnessValue(context.nestedContext(), value, { precision }),
            );

            return createOklabLightnessScale(context, values);
        },
    };
};
