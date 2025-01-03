import { createColorValue } from '../../../primitives';
import {
    type ColorValue,
    type ColorValueExplicitInput,
    type DecisionModelFactory,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorValueExplicitModel: DecisionModelFactory<
    ColorValue,
    ColorValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const value = createColorValue(valueContext, params.value);

            return createDecisionValue(valueContext, value);
        },
    };
};
