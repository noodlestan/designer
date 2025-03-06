import {
    DECISION_COLOR_OKLAB_CHROMA_SCALE,
    DECISION_COLOR_OKLAB_CHROMA_VALUE,
    DECISION_COLOR_OKLAB_HUE_SET,
    DECISION_COLOR_OKLAB_HUE_VALUE,
    DECISION_COLOR_OKLAB_LIGHTNESS_SCALE,
    DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
} from '../../../constants';
import {
    MODEL_TYPE_ANCHORED,
    MODEL_TYPE_BOUNDED,
    MODEL_TYPE_EXPLICIT,
    createColorOklabChromaScaleAnchoredModel,
    createColorOklabChromaScaleBoundedModel,
    createColorOklabChromaScaleExplicitModel,
    createColorOklabChromaValueExplicitModel,
    createColorOklabHueSetAnchoredModel,
    createColorOklabHueSetBoundedModel,
    createColorOklabHueSetExplicitModel,
    createColorOklabHueValueExplicitModel,
    createColorOklabLightnessScaleAnchoredModel,
    createColorOklabLightnessScaleBoundedModel,
    createColorOklabLightnessScaleExplicitModel,
    createColorOklabLightnessValueExplicitModel,
} from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const ColorOklabDecisionTypes: DecisionType[] = [
    {
        type: DECISION_COLOR_OKLAB_HUE_VALUE,
        name: 'Oklab Hue Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a Oklab color.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description:
                    'Defines the hue of a Oklab color as degrees on the Oklab color wheel.',
                factory: castFactory(createColorOklabHueValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_OKLAB_HUE_SET,
        name: 'Oklab Hue Set',
        category: 'set',
        domain: 'color',
        description: 'A decision to define the hue set for Oklab colors.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a Oklab hue set with arbitrary degrees.',
                factory: castFactory(createColorOklabHueSetExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a Oklab hue set interpolating linearly between two hue values.',
                factory: castFactory(createColorOklabHueSetBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a Oklab hue set from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorOklabHueSetAnchoredModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_OKLAB_CHROMA_VALUE,
        name: 'Oklab Chroma Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the chroma of a Oklab color.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description:
                    'Defines the chroma of a Oklab color as a number, where 0.4 is equivalent to 100%.',
                factory: castFactory(createColorOklabChromaValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_OKLAB_CHROMA_SCALE,
        name: 'Oklab Chroma Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a chroma scale for Oklab colors.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a Oklab chroma scale with arbitrary percentage values.',
                factory: castFactory(createColorOklabChromaScaleExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a Oklab chroma scale interpolating linearly between two chroma values.',
                factory: castFactory(createColorOklabChromaScaleBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a Oklab chroma scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorOklabChromaScaleAnchoredModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
        name: 'Oklab Lightness Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the lightness of a Oklab color.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines the lightness of a Oklab color as a percentage.',
                factory: castFactory(createColorOklabLightnessValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_OKLAB_LIGHTNESS_SCALE,
        name: 'Oklab Lightness Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a lightness scale for Oklab colors.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a Oklab lightness scale with arbitrary percentage values.',
                factory: castFactory(createColorOklabLightnessScaleExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a Oklab lightness scale interpolating linearly between two lightness values.',
                factory: castFactory(createColorOklabLightnessScaleBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a Oklab lightness scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorOklabLightnessScaleAnchoredModel),
            },
        ],
    },
];
