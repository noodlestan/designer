import type { ColorSetBoundedInput } from '../../../inputs';
import { generateBoundedColorList } from '../../../primitives';
import { type ColorSet, createColorSet, createColorValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSetBoundedModel: DecisionModelFactory<
    ColorSet,
    ColorSetBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createColorValue(context, from, options);
            const toValue = createColorValue(context, to, options);

            const list = generateBoundedColorList(fromValue.get(), toValue.get(), steps);
            const values = list.map(color => createColorValue(context, color, options));

            return createColorSet(context, values);
        },
    };
};
