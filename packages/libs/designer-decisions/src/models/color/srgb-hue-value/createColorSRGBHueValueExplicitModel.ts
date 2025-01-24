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
        produce: (valueContext, params) => {
            return createSRGBHueValue(valueContext, params.value);
        },
    };
};
