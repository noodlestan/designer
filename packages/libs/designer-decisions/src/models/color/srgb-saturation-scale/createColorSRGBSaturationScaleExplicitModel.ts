import { createSRGBSaturationScale, createSRGBSaturationValue } from '../../../primitives';
import type {
    ColorSRGBSaturationScaleExplicitInput,
    DecisionModelFactory,
    SRGBSaturationScale,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBSaturationScaleExplicitModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value =>
                createSRGBSaturationValue(valueContext, value),
            );

            const value = createSRGBSaturationScale(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
