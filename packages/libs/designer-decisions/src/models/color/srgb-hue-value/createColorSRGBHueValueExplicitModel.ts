import type { ColorSRGBHueValueExplicitInput } from '../../../inputs';
import { type SRGBHueValue, createSRGBHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBHueValueExplicitModel: DecisionModelFactory<
    SRGBHueValue,
    ColorSRGBHueValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            return createSRGBHueValue(context, value, { quantize });
        },
    };
};
