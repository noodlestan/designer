import { D_OKLAB_CHROMA_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { OklabChromaValue } from '../../values';

export const isOklabChromaValue = (
    decision: DecisionUnknown,
): decision is Decision<OklabChromaValue> => {
    return decision.type() === D_OKLAB_CHROMA_VALUE;
};
