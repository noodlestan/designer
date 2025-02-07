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
            const { precision } = params;

            const values = params.values.map(value =>
                createSRGBHueValue(context.nestedContext(), value, { precision }),
            );

            return createSRGBHueSet(context, values);
        },
    };
};
