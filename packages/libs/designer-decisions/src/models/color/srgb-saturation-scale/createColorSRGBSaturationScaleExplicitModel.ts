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
        produce: (context, params) => {
            const values = params.values.map(value =>
                createSRGBSaturationValue(context.nestedContext(), value),
            );

            return createSRGBSaturationScale(context, values);
        },
    };
};
