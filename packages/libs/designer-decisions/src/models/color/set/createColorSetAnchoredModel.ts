import { createColorSet, createColorValue, generateAnchoredColorList } from '../../../primitives';
import type { ColorSet, ColorSetAnchoredInput, DecisionModelFactory } from '../../../types';

export const createColorSetAnchoredModel: DecisionModelFactory<
    ColorSet,
    ColorSetAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const anchor = createColorValue(context.nestedContext(), params.anchor);

            const list = generateAnchoredColorList(anchor, params);
            const values = list.map(item => createColorValue(context.nestedContext(), item));
            return createColorSet(context, values);
        },
    };
};
