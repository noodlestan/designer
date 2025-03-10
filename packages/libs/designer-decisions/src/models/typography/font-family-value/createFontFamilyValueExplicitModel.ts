import type { FontFamilyValueExplicitInput } from '../../../inputs';
import { type FontFamilyValue, createFontFamilyValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createFontFamilyValueExplicitModel: DecisionModelFactory<
    FontFamilyValue,
    FontFamilyValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value } = context.params() || {};
            return createFontFamilyValue(context.forValue(value));
        },
    };
};
