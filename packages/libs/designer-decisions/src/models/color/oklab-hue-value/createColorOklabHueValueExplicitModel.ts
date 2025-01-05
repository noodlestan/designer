import { createOklabHueValue } from '../../../primitives';
import {
    type ColorOklabHueValueExplicitInput,
    type DecisionModelFactory,
    type OklabHueValue,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabHueValueExplicitModel: DecisionModelFactory<
    OklabHueValue,
    ColorOklabHueValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const value = createOklabHueValue(valueContext, params.value);

            return createDecisionValue(valueContext, value);
        },
    };
};
