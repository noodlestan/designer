import type { ColorValueExplicitInput } from '../../../inputs';
import { type ColorValue, createColorValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorValueExplicitModel: DecisionModelFactory<
    ColorValue,
    ColorValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value } = context.params() || {};
            return createColorValue(context.valueContext(value));
        },
    };
};
