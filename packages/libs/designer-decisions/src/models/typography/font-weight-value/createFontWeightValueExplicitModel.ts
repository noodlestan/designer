import type { FontWeightValueExplicitInput } from '../../../inputs';
import { type FontWeightValue, createFontWeightValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createFontWeightValueExplicitModel: DecisionModelFactory<
    FontWeightValue,
    FontWeightValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value } = context.params() || {};
            return createFontWeightValue(context.forValue(value));
        },
    };
};
