import { createSRGBSaturationScale, createSRGBSaturationValue } from '../../../primitives';
import type {
    ColorSRGBSaturationScaleExplicitInput,
    DecisionModelFactory,
    SRGBSaturationScale,
} from '../../../types';

export const createColorSRGBSaturationScaleExplicitModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value =>
                createSRGBSaturationValue(valueContext, value),
            );

            return createSRGBSaturationScale(valueContext, values);
        },
    };
};
