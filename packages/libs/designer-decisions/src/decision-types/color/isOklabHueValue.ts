import { D_OKLAB_HUE_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { OklabHueValue } from '../../values';

export const isOklabHueValue = (decision: DecisionUnknown): decision is Decision<OklabHueValue> => {
    return decision.type() === D_OKLAB_HUE_VALUE;
};
