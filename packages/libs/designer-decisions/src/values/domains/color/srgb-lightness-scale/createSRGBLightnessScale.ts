import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { SRGBLightnessScale, SRGBLightnessValue } from '../types';

export const createSRGBLightnessScale = (
    context: ValueContext,
    input: SRGBLightnessValue[],
): SRGBLightnessScale => {
    return createBaseSet(context, input);
};
