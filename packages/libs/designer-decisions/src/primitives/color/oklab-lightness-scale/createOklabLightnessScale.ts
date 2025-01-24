import type {
    DecisionValueContext,
    OklabLightnessScale,
    OklabLightnessValue,
} from '../../../types';
import { createBaseValue } from '../../base';
import { createItemSet } from '../../set';

export const createOklabLightnessScale = (
    context: DecisionValueContext,
    input: OklabLightnessValue[],
): OklabLightnessScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        ...createBaseValue(context),
        get: () => items,
    };
};
