import type { ColorOklabChromaValueExplicitInput } from '../../../inputs';
import { type OklabChromaValue, createOklabChromaValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabChromaValueExplicitModel: DecisionModelFactory<
    OklabChromaValue,
    ColorOklabChromaValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value, quantize } = context.params() || {};
            return createOklabChromaValue(context.valueContext(value), { quantize });
        },
    };
};
