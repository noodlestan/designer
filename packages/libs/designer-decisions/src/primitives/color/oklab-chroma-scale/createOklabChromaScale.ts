import type { ValueContext } from '../../../values';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';
import type { OklabChromaScale, OklabChromaValue } from '../../types';

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
