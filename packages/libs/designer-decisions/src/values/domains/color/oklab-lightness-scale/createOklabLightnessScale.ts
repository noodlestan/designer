import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabLightnessScale, OklabLightnessValue } from '../../../primitives';

export const createOklabLightnessScale = (
    context: ValueContext,
    input: OklabLightnessValue[],
): OklabLightnessScale => {
    return createBaseSet(context, input);
};
