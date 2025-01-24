import type { DecisionValueContext, OklabChromaScale, OklabChromaValue } from '../../../types';
import { createItemSet } from '../../set';

export const createOklabChromaScale = (
    context: DecisionValueContext,
    input: OklabChromaValue[],
): OklabChromaScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
