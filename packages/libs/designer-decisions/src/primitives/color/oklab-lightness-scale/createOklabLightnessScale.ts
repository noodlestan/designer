import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { OklabLightnessScale, OklabLightnessValue } from '../../types';

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
