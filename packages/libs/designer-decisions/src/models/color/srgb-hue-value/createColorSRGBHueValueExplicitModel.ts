import { createSRGBHueValue } from '../../../primitives';
import {
    type ColorSRGBHueValueExplicitInput,
    type DecisionModelFactory,
    type SRGBHueValue,
} from '../../../types';

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
