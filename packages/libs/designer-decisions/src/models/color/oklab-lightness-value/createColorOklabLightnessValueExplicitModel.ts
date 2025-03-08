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
            const options = { quantize };
            return createOklabLightnessValue(context.forValue(value), options);
        },
    };
};
