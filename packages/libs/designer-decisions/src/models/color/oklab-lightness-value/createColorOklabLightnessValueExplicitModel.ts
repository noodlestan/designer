import { createOklabLightnessValue } from '../../../primitives';
import {
    type ColorOklabLightnessValueExplicitInput,
    type DecisionModelFactory,
    type OklabLightnessValue,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabLightnessValueExplicitModel: DecisionModelFactory<
    OklabLightnessValue,
    ColorOklabLightnessValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const value = createOklabLightnessValue(valueContext, params.value);

            return createDecisionValue(valueContext, value);
        },
    };
};
