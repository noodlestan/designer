import type { FontSizeValueExplicitInput } from '../../../inputs';
import type { DeepPartial } from '../../../private';
import { type FontSizeValue, createFontSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createFontSizeValueExplicitModel: DecisionModelFactory<
    FontSizeValue,
    FontSizeValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const p = params as DeepPartial<FontSizeValueExplicitInput['params']>;
            const { quantize } = p;
            return createFontSizeValue(context, params.value, { quantize });
        },
    };
};
