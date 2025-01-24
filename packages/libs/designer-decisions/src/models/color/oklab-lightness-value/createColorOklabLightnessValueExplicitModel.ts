import { createOklabLightnessValue } from '../../../primitives';
import {
    type ColorOklabLightnessValueExplicitInput,
    type DecisionModelFactory,
    type OklabLightnessValue,
} from '../../../types';

export const createColorOklabLightnessValueExplicitModel: DecisionModelFactory<
    OklabLightnessValue,
    ColorOklabLightnessValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            return createOklabLightnessValue(valueContext, params.value);
        },
    };
};
