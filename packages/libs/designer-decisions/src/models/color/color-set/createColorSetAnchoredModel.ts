import type { ColorSetAnchoredInput } from '../../../inputs';
import { generateAnchoredColorList } from '../../../primitives';
import { type ColorSet, createColorSet, createColorValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSetAnchoredModel: DecisionModelFactory<
    ColorSet,
    ColorSetAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const anchorColor = createColorValue(context, anchor, options).get();

            const list = generateAnchoredColorList(anchorColor, { before, after, quantize });
            const values = list.map(size => createColorValue(context, size, options));

            return createColorSet(context, values);
        },
    };
};
