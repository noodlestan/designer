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
import type { DecisionType } from '../types';

import { castFactory } from './functions';

export const ColorDecisionTypes: DecisionType[] = [
    {
        type: 'color-hue-value',
        name: 'Color Hue',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the hue of a color as degrees on the color wheel.',
                factory: castFactory(createColorHueValueExplicit),
            },
        ],
    },
    {
        type: 'color-saturation-value',
        name: 'Color Saturation',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the saturation of a color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the saturation of a color as a percentage.',
                factory: castFactory(createColorSaturationValueExplicit),
            },
        ],
    },
    {
        type: 'color-lightness-value',
        name: 'Color Lightness',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the lightness of a color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the lightness of a color as a percentage.',
                factory: castFactory(createColorLightnessValueExplicit),
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
                factory: castFactory(createColorValueExplicit),
            },
        ],
    },
    {
        type: 'color-lightness-scale',
        name: 'Color Lightness Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a lightness scale for colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a lightness scale with arbitrary percentage values.',
                factory: castFactory(createColorLightnessScaleExplicit),
            },
            {
                model: 'linear-range',
                name: 'Linear Range',
                description:
                    'Defines a lightness scale interpolating linearly between two lightness values.',
                factory: castFactory(createColorLightnessScaleLinearRange),
            },
            {
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a lightness scale by successively applying a modifier to the previous step.',
                factory: castFactory(createColorLightnessScaleModifier),
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
                factory: castFactory(createColorSetExplicit),
            },
            {
                model: 'linear-range',
                name: 'Linear Range',
                description: 'Defines a gradient set interpolating linearly between two colors.',
                factory: castFactory(createColorSetLinearRange),
            },
            {
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a color set by successively applying a modifier to the previous step.',
                factory: castFactory(createColorSetModifier),
            },
        ],
    },
];
