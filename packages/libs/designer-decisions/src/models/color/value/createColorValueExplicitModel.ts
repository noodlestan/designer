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
        produce: (context, params) => {
            return createColorValue(context, params.value);
        },
    };
};
