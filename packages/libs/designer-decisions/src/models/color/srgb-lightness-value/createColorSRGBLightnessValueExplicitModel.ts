import type { ColorSRGBLightnessValueExplicitInput } from '../../../inputs';
import { type SRGBLightnessValue, createSRGBLightnessValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessValueExplicitModel: DecisionModelFactory<
    SRGBLightnessValue,
    ColorSRGBLightnessValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            const options = { quantize };
            return createSRGBLightnessValue(context.forValue(value), options);
        },
    };
};
