import {
    DECISION_COLOR_SRGB_HUE_SET,
    DECISION_COLOR_SRGB_HUE_VALUE,
    DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    DECISION_COLOR_SRGB_SATURATION_SCALE,
    DECISION_COLOR_SRGB_SATURATION_VALUE,
} from '../../../constants';
import {
    MODEL_TYPE_ANCHORED,
    MODEL_TYPE_BOUNDED,
    MODEL_TYPE_EXPLICIT,
    createColorSRGBHueSetAnchoredModel,
    createColorSRGBHueSetBoundedModel,
    createColorSRGBHueSetExplicitModel,
    createColorSRGBHueValueExplicitModel,
    createColorSRGBLightnessScaleAnchoredModel,
    createColorSRGBLightnessScaleBoundedModel,
    createColorSRGBLightnessScaleExplicitModel,
    createColorSRGBLightnessValueExplicitModel,
    createColorSRGBSaturationScaleAnchoredModel,
    createColorSRGBSaturationScaleBoundedModel,
    createColorSRGBSaturationScaleExplicitModel,
    createColorSRGBSaturationValueExplicitModel,
} from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const ColorSRGBDecisionTypes: DecisionType[] = [
    {
        type: DECISION_COLOR_SRGB_HUE_VALUE,
        name: 'sRGB Hue Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a sRGB color.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines the hue of a sRGB color as degrees on the sRGB color wheel.',
                factory: castFactory(createColorSRGBHueValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_SRGB_HUE_SET,
        name: 'sRGB Hue Set',
        category: 'set',
        domain: 'color',
        description: 'A decision to define the hue set for sRGB colors.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a sRGB hue set with arbitrary degrees.',
                factory: castFactory(createColorSRGBHueSetExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a sRGB hue set interpolating linearly between two hue values.',
                factory: castFactory(createColorSRGBHueSetBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a sRGB hue set from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBHueSetAnchoredModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_SRGB_SATURATION_VALUE,
        name: 'sRGB Saturation Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the saturation of a sRGB color.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines the saturation of a sRGB color as a percentage.',
                factory: castFactory(createColorSRGBSaturationValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_SRGB_SATURATION_SCALE,
        name: 'sRGB Saturation Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a saturation scale for sRGB colors.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a sRGB saturation scale with arbitrary percentage values.',
                factory: castFactory(createColorSRGBSaturationScaleExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a sRGB saturation scale interpolating linearly between two saturation values.',
                factory: castFactory(createColorSRGBSaturationScaleBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a sRGB saturation scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBSaturationScaleAnchoredModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
        name: 'sRGB Lightness Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the lightness of a sRGB color.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines the lightness of a sRGB color as a percentage.',
                factory: castFactory(createColorSRGBLightnessValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
        name: 'sRGB Lightness Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a lightness scale for sRGB colors.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a sRGB lightness scale with arbitrary percentage values.',
                factory: castFactory(createColorSRGBLightnessScaleExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a sRGB lightness scale interpolating linearly between two lightness values.',
                factory: castFactory(createColorSRGBLightnessScaleBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a sRGB lightness scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBLightnessScaleAnchoredModel),
            },
        ],
    },
];
