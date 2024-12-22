import { type Decision, getDecisionType } from '@noodlestan/designer-decisions';

import {
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
        'color-value': ShowColorValueDecision,
        'color-set': ShowColorSetDecision,
    };

    const type = getDecisionType(decision);
    const component = DECISION_TYPE_COMPONENT_MAP[type];

    return component || DECISION_TYPE_COMPONENT_UNAVAILABLE;
};
