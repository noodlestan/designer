import { D_SIZE_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SizeValue } from '../../values';

export const isSizeValue = (decision: DecisionUnknown): decision is Decision<SizeValue> => {
    return decision.type() === D_SIZE_VALUE;
};
