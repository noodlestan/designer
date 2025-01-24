import { createSRGBSaturationValue } from '../../../primitives';
import {
    type ColorSRGBSaturationValueExplicitInput,
    type DecisionModelFactory,
    type SRGBSaturationValue,
} from '../../../types';

export const createColorSRGBSaturationValueExplicitModel: DecisionModelFactory<
    SRGBSaturationValue,
    ColorSRGBSaturationValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            return createSRGBSaturationValue(context, params.value);
        },
    };
};
