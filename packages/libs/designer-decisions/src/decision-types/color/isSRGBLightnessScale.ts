import { D_SRGB_LIGHTNESS_SCALE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SRGBLightnessScale } from '../../values';

export const isSRGBLightnessScale = (
    decision: DecisionUnknown,
): decision is Decision<SRGBLightnessScale> => {
    return decision.type() === D_SRGB_LIGHTNESS_SCALE;
};
