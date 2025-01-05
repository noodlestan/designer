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
    createColorSetAnchoredModel,
    createColorSetBoundedModel,
    createColorSetExplicitModel,
    createColorValueExplicitModel,
} from '../models';
import type { DecisionType } from '../types';

import { castFactory } from './functions';

export const ColorDecisionTypes: DecisionType[] = [
    {
        type: 'color-value',
        name: 'Color Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define a color value.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a color value (either RGB, HSL, or other formats).',
                factory: castFactory(createColorValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-set',
        name: 'Color Set',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a color set.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a color set with arbitrary color values.',
                factory: castFactory(createColorSetExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description: 'Defines a gradient set interpolating linearly between two colors.',
                factory: castFactory(createColorSetBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a color set from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSetAnchoredModel),
            },
        ],
    },
    {
        type: 'color-srgb-hue-value',
        name: 'Color sRGB Hue Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a sRGB color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the hue of a sRGB color as degrees on the color wheel.',
                factory: castFactory(createColorSRGBHueValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-srgb-hue-set',
        name: 'Color sRGB Hue Set',
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
        name: 'Color sRGB Saturation Value',
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
        name: 'Color sRGB Saturation Scale',
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
        name: 'Color sRGB Lightness Value',
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
        name: 'Color sRGB Lightness Scale',
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
