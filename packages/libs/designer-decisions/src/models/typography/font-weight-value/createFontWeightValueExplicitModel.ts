import type { FontWeightValueExplicitInput } from '../../../inputs';
import type { DeepPartial } from '../../../private';
import { type FontWeightValue, createFontWeightValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createFontWeightValueExplicitModel: DecisionModelFactory<
    FontWeightValue,
    FontWeightValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const p = params as DeepPartial<FontWeightValueExplicitInput['params']>;
            const { quantize } = p;
            return createFontWeightValue(context, params.value, { quantize });
        },
    };
};
