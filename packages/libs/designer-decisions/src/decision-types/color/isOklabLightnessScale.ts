import { D_OKLAB_LIGHTNESS_SCALE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { OklabLightnessScale } from '../../values';

export const isOklabLightnessScale = (
    decision: DecisionUnknown,
): decision is Decision<OklabLightnessScale> => {
    return decision.type() === D_OKLAB_LIGHTNESS_SCALE;
};
