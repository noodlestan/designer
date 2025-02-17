import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { OklabHueSet, OklabHueValue } from '../../types';

export const createOklabHueSet = (context: ValueContext, input: OklabHueValue[]): OklabHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
