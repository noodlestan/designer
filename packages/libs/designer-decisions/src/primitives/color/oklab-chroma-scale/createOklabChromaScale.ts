import type { OklabChromaScale, OklabChromaValue, ValueContext } from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

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
