import type { ColorSRGBSaturationScaleExplicitInput } from '../../../inputs';
import {
    type SRGBSaturationScale,
    createSRGBSaturationScale,
    createSRGBSaturationValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBSaturationScaleExplicitModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items =
                values?.map(size =>
                    createSRGBSaturationValue(context.valueContext(size), options),
                ) || [];

            return createSRGBSaturationScale(context.valueContext(items));
        },
    };
};
