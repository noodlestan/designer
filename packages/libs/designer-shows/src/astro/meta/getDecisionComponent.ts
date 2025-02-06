import { type DecisionUnknown } from '@noodlestan/designer-decisions';

import { ShowSetDecision, ShowValueDecision } from '../decisions';
import type { DecisionTypeComponent, DecisionValueComponent, DecisionVizComponent } from '../types';
import {
    ShowColorChannelValue,
    ShowColorChannelViz,
    ShowColorValue,
    ShowColorViz,
    ShowSpaceValue,
    ShowSpaceViz,
} from '../values';

import type { DecisionTypeComponents } from './types';

function valueC<T extends object = object>(component: unknown): DecisionValueComponent<T> {
    return component as unknown as DecisionValueComponent<T>;
}

function vizC<T extends object = object>(component: unknown): DecisionVizComponent<T> {
    return component as unknown as DecisionVizComponent<T>;
}

function channelCs(decision: DecisionTypeComponent): DecisionTypeComponents {
    return {
        decision: {
            component: decision,
        },
        value: {
            component: valueC(ShowColorChannelValue),
        },
        viz: {
            component: valueC(ShowColorChannelViz),
        },
    };
}

function defaultCs(
    decision: DecisionTypeComponent,
    value: DecisionValueComponent,
    viz: DecisionVizComponent,
): DecisionTypeComponents {
    return {
        decision: {
            component: decision,
        },
        value: {
            component: value,
        },
        viz: {
            component: viz,
        },
    };
}

export const getDecisionComponentMap = (
    decision: DecisionUnknown,
): DecisionTypeComponents | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DECISION_TYPE_COMPONENT_MAP: Record<string, DecisionTypeComponents<any>> = {
        'color-oklab-lightness-value': channelCs(ShowValueDecision),
        'color-oklab-lightness-scale': channelCs(ShowSetDecision),
        'color-oklab-chroma-value': channelCs(ShowValueDecision),
        'color-oklab-chroma-scale': channelCs(ShowSetDecision),
        'color-oklab-hue-value': channelCs(ShowValueDecision),
        'color-oklab-hue-set': channelCs(ShowSetDecision),
        'color-srgb-hue-value': channelCs(ShowValueDecision),
        'color-srgb-hue-set': channelCs(ShowSetDecision),
        'color-srgb-lightness-value': channelCs(ShowValueDecision),
        'color-srgb-lightness-scale': channelCs(ShowSetDecision),
        'color-srgb-saturation-value': channelCs(ShowValueDecision),
        'color-srgb-saturation-scale': channelCs(ShowSetDecision),
        'color-set': defaultCs(ShowSetDecision, valueC(ShowColorValue), vizC(ShowColorViz)),
        'color-value': defaultCs(ShowValueDecision, valueC(ShowColorValue), vizC(ShowColorViz)),
        'space-value': defaultCs(ShowValueDecision, valueC(ShowSpaceValue), vizC(ShowSpaceViz)),
        'space-scale': defaultCs(ShowSetDecision, valueC(ShowSpaceValue), vizC(ShowSpaceViz)),
    };

    return DECISION_TYPE_COMPONENT_MAP[decision.type()];
};
