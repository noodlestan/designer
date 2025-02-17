import type { ColorSRGBSaturationScaleExplicitInput } from '../../../inputs';
import {
    type SRGBSaturationScale,
    createSRGBSaturationScale,
    createSRGBSaturationValue,
} from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBSaturationScaleExplicitModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createSRGBSaturationValue(context.nestedContext(), value, { quantize }),
            );

            return createSRGBSaturationScale(context, values);
        },
    };
};
