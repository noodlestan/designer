import { createOklabHueSet, createOklabHueValue } from '../../../primitives';
import type {
    ColorOklabHueSetExplicitInput,
    DecisionModelFactory,
    OklabHueSet,
} from '../../../types';

export const createColorOklabHueSetExplicitModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createOklabHueValue(valueContext, value));

            return createOklabHueSet(valueContext, values);
        },
    };
};
