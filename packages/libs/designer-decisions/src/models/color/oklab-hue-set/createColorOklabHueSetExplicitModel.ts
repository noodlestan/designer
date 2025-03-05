import type { ColorOklabHueSetExplicitInput } from '../../../inputs';
import { type OklabHueSet, createOklabHueSet, createOklabHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueSetExplicitModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items = values?.map(size => createOklabHueValue(context, size, options)) || [];

            return createOklabHueSet(context, items);
        },
    };
};
