import type { ColorOklabLightnessValueExplicitInput } from '../../../inputs';
import { type OklabLightnessValue, createOklabLightnessValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

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
