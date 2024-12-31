import {
    createColorSRGBHueValueExplicitModel,
    createColorSRGBLightnessScaleAnchoredModel,
    createColorSRGBLightnessScaleBoundedModel,
    createColorSRGBLightnessScaleExplicitModel,
    createColorSRGBLightnessValueExplicitModel,
    createColorSRGBSaturationValueExplicitModel,
    createColorSetAnchoredModel,
    createColorSetBoundedModel,
    createColorSetExplicitModel,
    createColorValueExplicitModel,
} from '../decision';
import type { DecisionType } from '../types';

import { castFactory } from './functions';

export const ColorDecisionTypes: DecisionType[] = [
    {
        type: 'color-srgb-hue-value',
        name: 'Color Hue',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the hue of a color as degrees on the color wheel.',
                factory: castFactory(createColorSRGBHueValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-srgb-saturation-value',
        name: 'Color Saturation',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the saturation of a color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the saturation of a color as a percentage.',
                factory: castFactory(createColorSRGBSaturationValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-srgb-lightness-value',
        name: 'Color Lightness',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the lightness of a color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the lightness of a color as a percentage.',
                factory: castFactory(createColorSRGBLightnessValueExplicitModel),
            },
        ],
    },
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
        type: 'color-srgb-lightness-scale',
        name: 'Color Lightness Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a lightness scale for colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a lightness scale with arbitrary percentage values.',
                factory: castFactory(createColorSRGBLightnessScaleExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a lightness scale interpolating linearly between two lightness values.',
                factory: castFactory(createColorSRGBLightnessScaleBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a lightness scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSRGBLightnessScaleAnchoredModel),
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
];
