import type { ColorOklabLightnessValueExplicitInput } from '../../../inputs';
import { type OklabLightnessValue, createOklabLightnessValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessValueExplicitModel: DecisionModelFactory<
    OklabLightnessValue,
    ColorOklabLightnessValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            return createOklabLightnessValue(context, value, { quantize });
        },
    };
};
