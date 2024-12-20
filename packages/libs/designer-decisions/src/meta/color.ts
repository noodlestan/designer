import {
    createColorHueValueExplicit,
    createColorLightnessScaleExplicit,
    createColorLightnessScaleLinearRange,
    createColorLightnessScaleModifier,
    createColorLightnessValueExplicit,
    createColorSaturationValueExplicit,
    createColorSetExplicit,
    createColorSetLinearRange,
    createColorSetModifier,
    createColorValueExplicit,
} from '../decision';
import type { DecisionTypeMeta } from '../types';

import { castFactory } from './functions';

export const ColorDecisionTypes: DecisionTypeMeta[] = [
    {
        category: 'value',
        domain: 'color',
        type: 'color-hue-value',
        name: 'Color Hue',
        description: 'A decision to define the hue of a color.',
        models: [
            {
                factory: castFactory(createColorHueValueExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the hue of a color as degrees on the color wheel.',
            },
        ],
    },
    {
        category: 'value',
        domain: 'color',
        type: 'color-saturation-value',
        name: 'Color Saturation',
        description: 'A decision to define the saturation of a color.',
        models: [
            {
                factory: castFactory(createColorSaturationValueExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the saturation of a color as a percentage.',
            },
        ],
    },
    {
        category: 'value',
        domain: 'color',
        type: 'color-lightness-value',
        name: 'Color Lightness',
        description: 'A decision to define the lightness of a color.',
        models: [
            {
                factory: castFactory(createColorLightnessValueExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the lightness of a color as a percentage.',
            },
        ],
    },
    {
        category: 'value',
        domain: 'color',
        type: 'color-value',
        name: 'Color Value',
        description: 'A decision to define a color value.',
        models: [
            {
                factory: castFactory(createColorValueExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a color value (either RGB, HSL, or other formats).',
            },
        ],
    },
    {
        category: 'scale',
        domain: 'color',
        type: 'color-lightness-scale',
        name: 'Color Lightness Scale',
        description: 'A decision to define a lightness scale for colors.',
        models: [
            {
                factory: castFactory(createColorLightnessScaleExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a lightness scale with arbitrary percentage values.',
            },
            {
                factory: castFactory(createColorLightnessScaleLinearRange),
                model: 'linear-range',
                name: 'Linear Range',
                description:
                    'Defines a lightness scale interpolating linearly between two lightness values.',
            },
            {
                factory: castFactory(createColorLightnessScaleModifier),
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a lightness scale by successively applying a modifier to the previous step.',
            },
        ],
    },
    {
        category: 'scale',
        domain: 'color',
        type: 'color-set',
        name: 'Color Set',
        description: 'A decision to define a color set.',
        models: [
            {
                factory: castFactory(createColorSetExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a color set with arbitrary color values.',
            },
            {
                factory: castFactory(createColorSetLinearRange),
                model: 'linear-range',
                name: 'Linear Range',
                description: 'Defines a gradient set interpolating linearly between two colors.',
            },
            {
                factory: castFactory(createColorSetModifier),
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a color set by successively applying a modifier to the previous step.',
            },
        ],
    },
];
