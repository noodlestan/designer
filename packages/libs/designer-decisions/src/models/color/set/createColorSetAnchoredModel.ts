import { createColorSet, createColorValue, generateAnchoredColorList } from '../../../primitives';
import type { ColorSet, ColorSetAnchoredInput, DecisionModelFactory } from '../../../types';

export const createColorSetAnchoredModel: DecisionModelFactory<
    ColorSet,
    ColorSetAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchor = createColorValue(valueContext, params.anchor);

            const list = generateAnchoredColorList(anchor, params);
            const values = list.map(item => createColorValue(valueContext, item));
            return createColorSet(valueContext, values);
        },
    };
};
