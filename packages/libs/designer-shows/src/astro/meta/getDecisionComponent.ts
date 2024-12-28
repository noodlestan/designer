import { type Decision, getDecisionType } from '@noodlestan/designer-decisions';

import {
    ShowColorHueValueDecision,
    ShowColorLightnessScaleDecision,
    ShowColorLightnessValueDecision,
    ShowColorSaturationValueDecision,
    ShowColorSetDecision,
    ShowColorValueDecision,
    ShowSpaceScaleDecision,
    ShowSpaceValueDecision,
} from '../decisions';
import type { DecisionTypeComponent } from '../types';

export const getDecisionComponent = (
    decision: Decision<unknown>,
): DecisionTypeComponent | undefined => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const DECISION_TYPE_COMPONENT_MAP: Record<string, DecisionTypeComponent> = {
        'color-hue-value': ShowColorHueValueDecision,
        'color-lightness-value': ShowColorLightnessValueDecision,
        'color-lightness-scale': ShowColorLightnessScaleDecision,
        'color-saturation-value': ShowColorSaturationValueDecision,
        'color-set': ShowColorSetDecision,
        'color-value': ShowColorValueDecision,
        'space-value': ShowSpaceValueDecision,
        'space-set': ShowSpaceScaleDecision,
    };

    const type = getDecisionType(decision);
    return DECISION_TYPE_COMPONENT_MAP[type];
};
