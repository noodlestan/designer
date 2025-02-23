import type { SizeValueExplicitInput } from '../../../inputs';
import { type SizeValue, createSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeValueExplicitModel: DecisionModelFactory<
    SizeValue,
    SizeValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;
            return createSizeValue(context, params.value, { quantize });
        },
    };
};
