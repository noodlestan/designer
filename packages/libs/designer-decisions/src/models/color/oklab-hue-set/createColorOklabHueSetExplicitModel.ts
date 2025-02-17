import type { ColorOklabHueSetExplicitInput } from '../../../inputs';
import { type OklabHueSet, createOklabHueSet, createOklabHueValue } from '../../../primitives';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueSetExplicitModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetExplicitInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const values = params.values.map(value =>
                createOklabHueValue(context.nestedContext(), value, { quantize }),
            );

            return createOklabHueSet(context, values);
        },
    };
};
