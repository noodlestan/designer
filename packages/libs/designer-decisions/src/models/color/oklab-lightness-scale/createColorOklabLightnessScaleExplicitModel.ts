import type { ColorOklabLightnessScaleExplicitInput } from '../../../inputs';
import {
    type OklabLightnessScale,
    createOklabLightnessScale,
    createOklabLightnessValue,
} from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessScaleExplicitModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createOklabLightnessValue(context.nestedContext(), value, { quantize }),
            );

            return createOklabLightnessScale(context, values);
        },
    };
};
