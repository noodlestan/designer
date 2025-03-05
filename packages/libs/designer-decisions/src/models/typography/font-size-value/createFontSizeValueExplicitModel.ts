import type { FontSizeValueExplicitInput } from '../../../inputs';
import { type FontSizeValue, createFontSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createFontSizeValueExplicitModel: DecisionModelFactory<
    FontSizeValue,
    FontSizeValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            return createFontSizeValue(context, value, { quantize });
        },
    };
};
