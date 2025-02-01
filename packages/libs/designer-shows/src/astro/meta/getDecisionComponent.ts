import { type DecisionUnknown } from '@noodlestan/designer-decisions';

import {
    ShowColorOklabChromaScaleDecision,
    ShowColorOklabChromaValueDecision,
    ShowColorOklabHueSetDecision,
    ShowColorOklabHueValueDecision,
    ShowColorOklabLightnessScaleDecision,
    ShowColorOklabLightnessValueDecision,
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
    decision: DecisionUnknown,
): DecisionTypeComponent | undefined => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const DECISION_TYPE_COMPONENT_MAP: Record<string, DecisionTypeComponent> = {
        'color-oklab-lightness-value': ShowColorOklabLightnessValueDecision,
        'color-oklab-lightness-scale': ShowColorOklabLightnessScaleDecision,
        'color-oklab-chroma-value': ShowColorOklabChromaValueDecision,
        'color-oklab-chroma-scale': ShowColorOklabChromaScaleDecision,
        'color-oklab-hue-value': ShowColorOklabHueValueDecision,
        'color-oklab-hue-set': ShowColorOklabHueSetDecision,
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

    return DECISION_TYPE_COMPONENT_MAP[decision.type()];
};
