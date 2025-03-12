import { D_SRGB_LIGHTNESS_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SRGBLightnessValue } from '../../values';

export const isSRGBLightnessValue = (
    decision: DecisionUnknown,
): decision is Decision<SRGBLightnessValue> => {
    return decision.type() === D_SRGB_LIGHTNESS_VALUE;
};
