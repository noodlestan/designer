import type { ColorSetExplicitInput } from '../../../inputs';
import { type ColorSet, createColorSet, createColorValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSetExplicitModel: DecisionModelFactory<
    ColorSet,
    ColorSetExplicitInput
> = () => {
    return {
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const colors =
                values?.map(color => createColorValue(context.forValue(color), options)) || [];

            return createColorSet(context.forValue(colors));
        },
    };
};
