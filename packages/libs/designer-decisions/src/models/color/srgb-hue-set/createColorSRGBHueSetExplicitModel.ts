import type { ColorSRGBHueSetExplicitInput } from '../../../inputs';
import { type SRGBHueSet, createSRGBHueSet, createSRGBHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBHueSetExplicitModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items = values?.map(size => createSRGBHueValue(context, size, options)) || [];

            return createSRGBHueSet(context, items);
        },
    };
};
