import { D_LINE_HEIGHT_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { LineHeightValue } from '../../values';

export const isLineHeightValue = (
    decision: DecisionUnknown,
): decision is Decision<LineHeightValue> => {
    return decision.type() === D_LINE_HEIGHT_VALUE;
};
