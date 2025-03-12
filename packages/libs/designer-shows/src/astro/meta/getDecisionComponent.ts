import { type DecisionUnknown } from '@noodlestan/designer-decisions';

import { ShowSetDecision, ShowValueDecision } from '../decisions';
import type {
    DecisionTypeComponent,
    DecisionValueComponent,
    DecisionVizComponent,
    ShowDecisionLayoutName,
} from '../types';
import {
    ShowColorChannelValue,
    ShowColorChannelViz,
    ShowColorValue,
    ShowColorViz,
    ShowFontFamilyValue,
    ShowFontWeightValue,
    ShowLetterSpacingValue,
    ShowLineHeightValue,
    ShowSizeValue,
    ShowSizeViz,
    ShowTextStyleValue,
    ShowTextStyleViz,
    ShowTypefaceValue,
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
            component: vizC(ShowColorChannelViz),
        },
    };
}

function defaultCs(
    decision: DecisionTypeComponent,
    value: DecisionValueComponent,
    viz: DecisionVizComponent,
    layout?: ShowDecisionLayoutName,
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
        layout,
    };
}

export const getDecisionComponentMap = (
    decision: DecisionUnknown,
): DecisionTypeComponents | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DECISION_TYPE_COMPONENT_MAP: Record<string, DecisionTypeComponents<any>> = {
        'oklab-lightness-value': channelCs(ShowValueDecision),
        'oklab-lightness-scale': channelCs(ShowSetDecision),
        'oklab-chroma-value': channelCs(ShowValueDecision),
        'oklab-chroma-scale': channelCs(ShowSetDecision),
        'oklab-hue-value': channelCs(ShowValueDecision),
        'oklab-hue-set': channelCs(ShowSetDecision),
        'srgb-hue-value': channelCs(ShowValueDecision),
        'srgb-hue-set': channelCs(ShowSetDecision),
        'srgb-lightness-value': channelCs(ShowValueDecision),
        'srgb-lightness-scale': channelCs(ShowSetDecision),
        'srgb-saturation-value': channelCs(ShowValueDecision),
        'srgb-saturation-scale': channelCs(ShowSetDecision),
        'color-set': defaultCs(ShowSetDecision, valueC(ShowColorValue), vizC(ShowColorViz)),
        'color-value': defaultCs(ShowValueDecision, valueC(ShowColorValue), vizC(ShowColorViz)),
        'size-value': defaultCs(ShowValueDecision, valueC(ShowSizeValue), vizC(ShowSizeViz)),
        'size-scale': defaultCs(ShowSetDecision, valueC(ShowSizeValue), vizC(ShowSizeViz)),
        'typeface-value': defaultCs(
            ShowValueDecision,
            valueC(ShowTypefaceValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
        'font-family-value': defaultCs(
            ShowValueDecision,
            valueC(ShowFontFamilyValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
        'font-size-value': defaultCs(
            ShowValueDecision,
            valueC(ShowSizeValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
        'font-weight-value': defaultCs(
            ShowValueDecision,
            valueC(ShowFontWeightValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
        'line-height-value': defaultCs(
            ShowValueDecision,
            valueC(ShowLineHeightValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
        'letter-spacing-value': defaultCs(
            ShowValueDecision,
            valueC(ShowLetterSpacingValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
        'text-style-value': defaultCs(
            ShowValueDecision,
            valueC(ShowTextStyleValue),
            vizC(ShowTextStyleViz),
            'column',
        ),
    };

    return DECISION_TYPE_COMPONENT_MAP[decision.type()];
};
