import type { ColorValueExplicitInput } from '../../../inputs';
import { type ColorValue, createColorValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

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
