import type {
    DecisionValueContext,
    OklabLightnessScale,
    OklabLightnessValue,
} from '../../../types';
import { createItemSet } from '../../set';

export const createOklabLightnessScale = (
    context: DecisionValueContext,
    input: OklabLightnessValue[],
): OklabLightnessScale => {
    context.consume(input);

    const items = createItemSet(input);

    return {
        get: () => items,
    };
};
