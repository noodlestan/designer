import { createSRGBHueSet, createSRGBHueValue } from '../../../primitives';
import type {
    ColorSRGBHueSetExplicitInput,
    DecisionModelFactory,
    SRGBHueSet,
} from '../../../types';

export const createColorSRGBHueSetExplicitModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const values = params.values.map(value => createSRGBHueValue(valueContext, value));

            return createSRGBHueSet(valueContext, values);
        },
    };
};
