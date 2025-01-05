import { type Decision, getDecisionType } from '@noodlestan/designer-decisions';

import {
    ShowColorSRGBHueSetDecision,
    ShowColorSRGBHueValueDecision,
    ShowColorSRGBLightnessScaleDecision,
    ShowColorSRGBLightnessValueDecision,
    ShowColorSRGBSaturationScaleDecision,
    ShowColorSRGBSaturationValueDecision,
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
        'color-srgb-hue-value': ShowColorSRGBHueValueDecision,
        'color-srgb-hue-set': ShowColorSRGBHueSetDecision,
        'color-srgb-lightness-value': ShowColorSRGBLightnessValueDecision,
        'color-srgb-lightness-scale': ShowColorSRGBLightnessScaleDecision,
        'color-srgb-saturation-value': ShowColorSRGBSaturationValueDecision,
        'color-srgb-saturation-scale': ShowColorSRGBSaturationScaleDecision,
        'color-set': ShowColorSetDecision,
        'color-value': ShowColorValueDecision,
        'space-value': ShowSpaceValueDecision,
        'space-scale': ShowSpaceScaleDecision,
    };

    const type = getDecisionType(decision);
    return DECISION_TYPE_COMPONENT_MAP[type];
};
