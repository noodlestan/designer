import type { ColorOklabHueValueExplicitInput } from '../../../inputs';
import { type OklabHueValue, createOklabHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueValueExplicitModel: DecisionModelFactory<
    OklabHueValue,
    ColorOklabHueValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            const options = { quantize };
            return createOklabHueValue(context.forValue(value), options);
        },
    };
};
