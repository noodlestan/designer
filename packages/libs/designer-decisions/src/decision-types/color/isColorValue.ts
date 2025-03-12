import { D_COLOR_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { ColorValue } from '../../values';

export const isColorValue = (decision: DecisionUnknown): decision is Decision<ColorValue> => {
    return decision.type() === D_COLOR_VALUE;
};
