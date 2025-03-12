import { D_FONT_SIZE_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { FontSizeValue } from '../../values';

export const isFontSizeValue = (decision: DecisionUnknown): decision is Decision<FontSizeValue> => {
    return decision.type() === D_FONT_SIZE_VALUE;
};
