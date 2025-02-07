import { createOklabLightnessValue } from '../../../primitives';
import {
    type ColorOklabLightnessValueExplicitInput,
    type DecisionModelFactory,
    type OklabLightnessValue,
} from '../../../types';

export const createColorOklabLightnessValueExplicitModel: DecisionModelFactory<
    OklabLightnessValue,
    ColorOklabLightnessValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            return createOklabLightnessValue(context, params.value, { quantize });
        },
    };
};
