import type { ColorSRGBLightnessScaleExplicitInput } from '../../../inputs';
import {
    type SRGBLightnessScale,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessScaleExplicitModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items =
                values?.map(size =>
                    createSRGBLightnessValue(context.valueContext(size), options),
                ) || [];

            return createSRGBLightnessScale(context.valueContext(items));
        },
    };
};
