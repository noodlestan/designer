import type { ColorOklabChromaValueExplicitInput } from '../../../inputs';
import { type OklabChromaValue, createOklabChromaValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabChromaValueExplicitModel: DecisionModelFactory<
    OklabChromaValue,
    ColorOklabChromaValueExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            return createOklabChromaValue(context, params.value, { quantize });
        },
    };
};
