import { D_SRGB_SATURATION_SCALE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SRGBSaturationScale } from '../../values';

export const isSRGBSaturationScale = (
    decision: DecisionUnknown,
): decision is Decision<SRGBSaturationScale> => {
    return decision.type() === D_SRGB_SATURATION_SCALE;
};
