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
            const { precision } = params;

            return createSRGBSaturationValue(context, params.value, { precision });
        },
    };
};
