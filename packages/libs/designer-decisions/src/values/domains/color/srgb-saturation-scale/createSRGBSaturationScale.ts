import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { SRGBSaturationScale, SRGBSaturationValue } from '../../../primitives';

export const createSRGBSaturationScale = (
    context: ValueContext,
    input: SRGBSaturationValue[],
): SRGBSaturationScale => {
    return createBaseSet(context, input);
};
