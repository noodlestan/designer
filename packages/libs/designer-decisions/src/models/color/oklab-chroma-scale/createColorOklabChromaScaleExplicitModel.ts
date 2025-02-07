import { createOklabChromaScale, createOklabChromaValue } from '../../../primitives';
import type {
    ColorOklabChromaScaleExplicitInput,
    DecisionModelFactory,
    OklabChromaScale,
} from '../../../types';

export const createColorOklabChromaScaleExplicitModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleExplicitInput
> = () => {
    return {
        produce: (contex, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createOklabChromaValue(contex.nestedContext(), value, { quantize }),
            );

            return createOklabChromaScale(contex, values);
        },
    };
};
