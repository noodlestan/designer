import type { ColorOklabLightnessScaleExplicitInput } from '../../../inputs';
import {
    type OklabLightnessScale,
    createOklabLightnessScale,
    createOklabLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessScaleExplicitModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items =
                values?.map(size => createOklabLightnessValue(context, size, options)) || [];

            return createOklabLightnessScale(context, items);
        },
    };
};
