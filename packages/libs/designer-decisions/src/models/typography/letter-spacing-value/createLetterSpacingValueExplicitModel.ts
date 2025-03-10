import type { LetterSpacingValueExplicitInput } from '../../../inputs';
import { type LetterSpacingValue, createLetterSpacingValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createLetterSpacingValueExplicitModel: DecisionModelFactory<
    LetterSpacingValue,
    LetterSpacingValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            const options = { quantize };
            return createLetterSpacingValue(context.forValue(value), options);
        },
    };
};
