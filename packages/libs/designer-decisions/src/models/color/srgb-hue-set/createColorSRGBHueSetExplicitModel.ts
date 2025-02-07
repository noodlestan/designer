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
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createSRGBHueValue(context.nestedContext(), value, { quantize }),
            );

            return createSRGBHueSet(context, values);
        },
    };
};
