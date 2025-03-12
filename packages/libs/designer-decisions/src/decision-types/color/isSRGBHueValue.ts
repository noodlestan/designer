import { D_SRGB_HUE_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SRGBHueValue } from '../../values';

export const isSRGBHueValue = (decision: DecisionUnknown): decision is Decision<SRGBHueValue> => {
    return decision.type() === D_SRGB_HUE_VALUE;
};
