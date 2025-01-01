import { createColorSet, createColorValue, generateAnchoredColorList } from '../../../primitives';
import type { ColorSet, ColorSetAnchoredInput, DecisionModelFactory } from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSetAnchoredModel: DecisionModelFactory<
    ColorSet,
    ColorSetAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchor = createColorValue(valueContext, params.anchor);

            const list = generateAnchoredColorList(anchor, params);
            const values = list.map(item => createColorValue(valueContext, item));
            const value = createColorSet(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
