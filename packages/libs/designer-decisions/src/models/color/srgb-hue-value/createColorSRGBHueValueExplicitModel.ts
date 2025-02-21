import type { ColorSRGBHueValueExplicitInput } from '../../../inputs';
import { type SRGBHueValue, createSRGBHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBHueValueExplicitModel: DecisionModelFactory<
    SRGBHueValue,
    ColorSRGBHueValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            return createSRGBHueValue(context, params.value, { quantize });
        },
    };
};
