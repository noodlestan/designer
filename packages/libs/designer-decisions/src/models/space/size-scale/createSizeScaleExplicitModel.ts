import type { SizeScaleExplicitInput } from '../../../inputs';
import { type SizeScale, createSizeScale, createSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeScaleExplicitModel: DecisionModelFactory<
    SizeScale,
    SizeScaleExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items =
                values?.map(size => createSizeValue(context.valueContext(size), options)) || [];

            return createSizeScale(context.valueContext(items));
        },
    };
};
