import type { ColorOklabChromaScaleExplicitInput } from '../../../inputs';
import {
    type OklabChromaScale,
    createOklabChromaScale,
    createOklabChromaValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

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
