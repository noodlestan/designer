import { D_OKLAB_HUE_SET } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { OklabHueSet } from '../../values';

export const isOklabHueSet = (decision: DecisionUnknown): decision is Decision<OklabHueSet> => {
    return decision.type() === D_OKLAB_HUE_SET;
};
