import { createOklabHueValue } from '../../../primitives';
import {
    type ColorOklabHueValueExplicitInput,
    type DecisionModelFactory,
    type OklabHueValue,
} from '../../../types';

export const createColorOklabHueValueExplicitModel: DecisionModelFactory<
    OklabHueValue,
    ColorOklabHueValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            return createOklabHueValue(valueContext, params.value);
        },
    };
};
