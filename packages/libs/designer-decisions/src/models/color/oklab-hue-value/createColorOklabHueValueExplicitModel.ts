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
        produce: (context, params) => {
            return createOklabHueValue(context, params.value);
        },
    };
};
