import { createOklabHueSet, createOklabHueValue } from '../../../primitives';
import type {
    ColorOklabHueSetExplicitInput,
    DecisionModelFactory,
    OklabHueSet,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorOklabHueSetExplicitModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createOklabHueValue(valueContext, value));

            const value = createOklabHueSet(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
