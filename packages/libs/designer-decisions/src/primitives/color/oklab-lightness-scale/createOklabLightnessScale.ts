import type { OklabLightnessScale, OklabLightnessValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

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
