import type { ColorSetBoundedInput } from '../../../inputs';
import {
    type ColorSet,
    createColorSet,
    createColorValue,
    generateBoundedColorList,
} from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorSetBoundedModel: DecisionModelFactory<
    ColorSet,
    ColorSetBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const fromValue = createColorValue(context.nestedContext(), params.from);
            const toValue = createColorValue(context.nestedContext(), params.to);

            const list = generateBoundedColorList(fromValue, toValue, params.steps);
            const values = list
                .slice(1, list.length - 1)
                .map(item => createColorValue(context.nestedContext(), item));
            return createColorSet(context, [fromValue, ...values, toValue]);
        },
    };
};
