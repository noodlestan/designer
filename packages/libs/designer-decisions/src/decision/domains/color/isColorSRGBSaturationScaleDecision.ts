import { DECISION_COLOR_SRGB_SATURATION_SCALE } from '../../../constants';
import type { DecisionUnknown } from '../../types';

import type { ColorSRGBSaturationScaleDecision } from './types';

export const isColorSRGBSaturationScaleDecision = (
    decision: DecisionUnknown,
): decision is ColorSRGBSaturationScaleDecision => {
    return decision.type() === DECISION_COLOR_SRGB_SATURATION_SCALE;
};
