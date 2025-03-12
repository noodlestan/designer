import { D_SRGB_SATURATION_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SRGBSaturationValue } from '../../values';

export const isSRGBSaturationValue = (
    decision: DecisionUnknown,
): decision is Decision<SRGBSaturationValue> => {
    return decision.type() === D_SRGB_SATURATION_VALUE;
};
