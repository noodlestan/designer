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
        produce: context => {
            const { values, quantize } = context.params() || {};

            const options = { quantize };
            const items = values?.map(size => createOklabChromaValue(context, size, options)) || [];

            return createOklabChromaScale(context, items);
        },
    };
};
