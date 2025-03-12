import { D_SRGB_HUE_SET } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SRGBHueSet } from '../../values';

export const isSRGBHueSet = (decision: DecisionUnknown): decision is Decision<SRGBHueSet> => {
    return decision.type() === D_SRGB_HUE_SET;
};
