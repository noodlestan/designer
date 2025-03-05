import type { TypefaceValueExplicitInput } from '../../../inputs';
import { type TypefaceValue, createTypefaceValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createTypefaceValueExplicitModel: DecisionModelFactory<
    TypefaceValue,
    TypefaceValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value } = context.params() || {};
            return createTypefaceValue(context, value);
        },
    };
};
