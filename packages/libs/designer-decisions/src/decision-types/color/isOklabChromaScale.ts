import { D_OKLAB_CHROMA_SCALE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { OklabChromaScale } from '../../values';

export const isOklabChromaScale = (
    decision: DecisionUnknown,
): decision is Decision<OklabChromaScale> => {
    return decision.type() === D_OKLAB_CHROMA_SCALE;
};
