import { D_TEXT_STYLE_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { TextStyleValue } from '../../values';

export const isTextStyleValue = (
    decision: DecisionUnknown,
): decision is Decision<TextStyleValue> => {
    return decision.type() === D_TEXT_STYLE_VALUE;
};
