import { D_COLOR_SET } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { ColorSet } from '../../values';

export const isColorSet = (decision: DecisionUnknown): decision is Decision<ColorSet> => {
    return decision.type() === D_COLOR_SET;
};
