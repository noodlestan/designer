import type { ColorOklabHueValueExplicitInput } from '../../../inputs';
import { type OklabHueValue, createOklabHueValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueValueExplicitModel: DecisionModelFactory<
    OklabHueValue,
    ColorOklabHueValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            return createOklabHueValue(context, params.value, { quantize });
        },
    };
};
