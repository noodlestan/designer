import { D_OKLAB_LIGHTNESS_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { OklabLightnessValue } from '../../values';

export const isOklabLightnessValue = (
    decision: DecisionUnknown,
): decision is Decision<OklabLightnessValue> => {
    return decision.type() === D_OKLAB_LIGHTNESS_VALUE;
};
