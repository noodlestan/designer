import type { ValueContext } from '../../../../value';
import { createBaseValue, createItemSet } from '../../../primitives';
import type { OklabChromaScale, OklabChromaValue } from '../../../primitives/color/types';

export const createOklabChromaScale = (
    context: ValueContext,
    input: OklabChromaValue[],
): OklabChromaScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
