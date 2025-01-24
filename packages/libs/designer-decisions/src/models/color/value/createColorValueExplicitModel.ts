import { createColorValue } from '../../../primitives';
import {
    type ColorValue,
    type ColorValueExplicitInput,
    type DecisionModelFactory,
} from '../../../types';

export const createColorValueExplicitModel: DecisionModelFactory<
    ColorValue,
    ColorValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            return createColorValue(valueContext, params.value);
        },
    };
};
