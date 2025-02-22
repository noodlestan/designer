import { DECISION_COLOR_SRGB_SATURATION_VALUE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { ColorSRGBSaturationValueDecision } from './types';

export const isColorSRGBSaturationValueDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBSaturationValueDecision => {
    return decision.type() === DECISION_COLOR_SRGB_SATURATION_VALUE;
};
