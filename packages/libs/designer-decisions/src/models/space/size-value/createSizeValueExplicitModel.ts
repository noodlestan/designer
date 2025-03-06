import type { SizeValueExplicitInput } from '../../../inputs';
import { type SizeValue, createSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeValueExplicitModel: DecisionModelFactory<
    SizeValue,
    SizeValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            const options = { quantize };
            return createSizeValue(context.valueContext(value), options);
        },
    };
};
