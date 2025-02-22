import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { OklabHueSet, OklabHueValue } from '../../../primitives/color/types';

export const createOklabHueSet = (context: ValueContext, input: OklabHueValue[]): OklabHueSet => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
