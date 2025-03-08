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
            const options = { quantize };
            return createFontSizeValue(context.forValue(value), options);
        },
    };
};
