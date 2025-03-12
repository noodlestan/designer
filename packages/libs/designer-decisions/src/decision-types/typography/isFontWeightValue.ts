import { D_FONT_WEIGHT_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { FontWeightValue } from '../../values';

export const isFontWeightValue = (
    decision: DecisionUnknown,
): decision is Decision<FontWeightValue> => {
    return decision.type() === D_FONT_WEIGHT_VALUE;
};
