import { createSRGBSaturationValue } from '../../../primitives';
import {
    type ColorSRGBSaturationValueExplicitInput,
    type DecisionModelFactory,
    type SRGBSaturationValue,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBSaturationValueExplicitModel: DecisionModelFactory<
    SRGBSaturationValue,
    ColorSRGBSaturationValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const value = createSRGBSaturationValue(valueContext, params.value);

            return createDecisionValue(valueContext, value);
        },
    };
};
