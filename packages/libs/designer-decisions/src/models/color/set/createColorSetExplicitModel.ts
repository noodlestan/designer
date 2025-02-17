import type { ColorSetExplicitInput } from '../../../inputs';
import { type ColorSet, createColorSet, createColorValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

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
