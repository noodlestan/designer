import type { ColorSRGBSaturationValueExplicitInput } from '../../../inputs';
import { type SRGBSaturationValue, createSRGBSaturationValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBSaturationValueExplicitModel: DecisionModelFactory<
    SRGBSaturationValue,
    ColorSRGBSaturationValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            return createSRGBSaturationValue(context, params.value, { quantize });
        },
    };
};
