import { D_SIZE_SCALE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { SizeScale } from '../../values';

export const isSizeScale = (decision: DecisionUnknown): decision is Decision<SizeScale> => {
    return decision.type() === D_SIZE_SCALE;
};
