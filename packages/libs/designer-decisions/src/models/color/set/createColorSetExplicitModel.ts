import { createColorSet, createColorValue } from '../../../primitives';
import type { ColorSet, ColorSetExplicitInput, DecisionModelFactory } from '../../../types';

export const createColorSetExplicitModel: DecisionModelFactory<
    ColorSet,
    ColorSetExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const values = params.values?.map(value =>
                createColorValue(context.nestedContext(), value),
            );
            return createColorSet(context, values);
        },
    };
};
