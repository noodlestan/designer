import type { SizeScaleExplicitInput } from '../../../inputs';
import { type SizeScale, createSizeScale, createSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeScaleExplicitModel: DecisionModelFactory<
    SizeScale,
    SizeScaleExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createSizeValue(context.nestedContext(), value, { quantize }),
            );

            return createSizeScale(context, values);
        },
    };
};
