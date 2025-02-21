import {
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
        type: 'color-srgb-hue-value',
        name: 'sRGB Hue Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a sRGB color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the hue of a sRGB color as degrees on the sRGB color wheel.',
                factory: castFactory(createColorSRGBHueValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-srgb-hue-set',
        name: 'sRGB Hue Set',
        category: 'set',
        domain: 'color',
        description: 'A decision to define the hue set for sRGB colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a sRGB hue set with arbitrary degrees.',
                factory: castFactory(createColorSRGBHueSetExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a sRGB hue set interpolating linearly between two hue values.',
                factory: castFactory(createColorSRGBHueSetBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a sRGB hue set from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBHueSetAnchoredModel),
            },
        ],
    },
    {
        type: 'color-srgb-saturation-value',
        name: 'sRGB Saturation Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the saturation of a sRGB color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the saturation of a sRGB color as a percentage.',
                factory: castFactory(createColorSRGBSaturationValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-srgb-saturation-scale',
        name: 'sRGB Saturation Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a saturation scale for sRGB colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a sRGB saturation scale with arbitrary percentage values.',
                factory: castFactory(createColorSRGBSaturationScaleExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a sRGB saturation scale interpolating linearly between two saturation values.',
                factory: castFactory(createColorSRGBSaturationScaleBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a sRGB saturation scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBSaturationScaleAnchoredModel),
            },
        ],
    },
    {
        type: 'color-srgb-lightness-value',
        name: 'sRGB Lightness Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the lightness of a sRGB color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the lightness of a sRGB color as a percentage.',
                factory: castFactory(createColorSRGBLightnessValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-srgb-lightness-scale',
        name: 'sRGB Lightness Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a lightness scale for sRGB colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a sRGB lightness scale with arbitrary percentage values.',
                factory: castFactory(createColorSRGBLightnessScaleExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a sRGB lightness scale interpolating linearly between two lightness values.',
                factory: castFactory(createColorSRGBLightnessScaleBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a sRGB lightness scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBLightnessScaleAnchoredModel),
            },
        ],
    },
];
