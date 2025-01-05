import { createSRGBHueSet, createSRGBHueValue } from '../../../primitives';
import type {
    ColorSRGBHueSetExplicitInput,
    DecisionModelFactory,
    SRGBHueSet,
} from '../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBHueSetExplicitModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createSRGBHueValue(valueContext, value));

            const value = createSRGBHueSet(valueContext, values);

            return createDecisionValue(valueContext, value);
        },
    };
};
