import { type Decision, getDecisionType } from '@noodlestan/designer-decisions';

import {
    ShowColorHueValueDecision,
    ShowColorLightnessScaleDecision,
    ShowColorLightnessValueDecision,
    ShowColorSaturationValueDecision,
    ShowColorSetDecision,
    ShowColorValueDecision,
    ShowDecisionUnavailable,
} from '../decisions';
import type { DecisionTypeComponent } from '../types';

export const getDecisionComponent = (decision: Decision<unknown>): DecisionTypeComponent => {
    // WIP we would rather have this in a constants.ts file but it looks like
    // component function references are not available in the unit scope
    const DECISION_TYPE_COMPONENT_UNAVAILABLE: DecisionTypeComponent = ShowDecisionUnavailable;
    const DECISION_TYPE_COMPONENT_MAP: Record<string, DecisionTypeComponent> = {
        'color-hue-value': ShowColorHueValueDecision,
        'color-saturation-value': ShowColorSaturationValueDecision,
        'color-lightness-value': ShowColorLightnessValueDecision,
        'color-lightness-scale': ShowColorLightnessScaleDecision,
        'color-value': ShowColorValueDecision,
        'color-set': ShowColorSetDecision,
    };

    const type = getDecisionType(decision);
    const component = DECISION_TYPE_COMPONENT_MAP[type];

    return component || DECISION_TYPE_COMPONENT_UNAVAILABLE;
};
