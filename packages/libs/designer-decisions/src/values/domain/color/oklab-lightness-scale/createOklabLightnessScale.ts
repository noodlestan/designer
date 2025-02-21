import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { OklabLightnessScale, OklabLightnessValue } from '../../../primitives/color/types';

export const createOklabLightnessScale = (
    context: ValueContext,
    input: OklabLightnessValue[],
): OklabLightnessScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
