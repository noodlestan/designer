import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabLightnessScale, OklabLightnessValue } from '../types';

export const createOklabLightnessScale = (
    context: ValueContext<OklabLightnessValue[]>,
): OklabLightnessScale => {
    return createBaseSet(context);
};
