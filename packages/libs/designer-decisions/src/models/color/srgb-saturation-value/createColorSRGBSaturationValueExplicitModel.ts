import type { ColorSRGBSaturationValueExplicitInput } from '../../../inputs';
import { type SRGBSaturationValue, createSRGBSaturationValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBSaturationValueExplicitModel: DecisionModelFactory<
    SRGBSaturationValue,
    ColorSRGBSaturationValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            const options = { quantize };
            return createSRGBSaturationValue(context.forValue(value), options);
        },
    };
};
