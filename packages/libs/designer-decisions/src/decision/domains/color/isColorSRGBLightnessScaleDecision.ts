import { DECISION_COLOR_SRGB_LIGHTNESS_SCALE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { ColorSRGBLightnessScaleDecision } from './types';

export const isColorSRGBLightnessScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBLightnessScaleDecision => {
    return decision.type() === DECISION_COLOR_SRGB_LIGHTNESS_SCALE;
};
