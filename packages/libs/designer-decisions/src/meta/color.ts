import {
    createColorHueDecision,
    createColorLightnessDecision,
    createColorLightnessScaleDecision,
    createColorSaturationDecision,
    createColorScaleDecision,
    createColorValueDecision,
} from '../decisions';
import type { DecisionTypeMeta } from '../types';

export const ColorDecisionTypes: DecisionTypeMeta[] = [
    {
        category: 'value',
        domain: 'color',
        type: 'color-hue',
        name: 'Color Hue',
        description: 'A decision to define the hue of a color.',
        factory: createColorHueDecision,
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the hue of a color as degrees on the color wheel.',
            },
        ],
    },
    {
        category: 'value',
        domain: 'color',
        type: 'color-saturation',
        name: 'Color Saturation',
        description: 'A decision to define the saturation of a color.',
        factory: createColorSaturationDecision,
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the saturation of a color as a percentage.',
            },
        ],
    },
    {
        category: 'value',
        domain: 'color',
        type: 'color-lightness',
        name: 'Color Lightness',
        description: 'A decision to define the lightness of a color.',
        factory: createColorLightnessDecision,
        models: [
            {
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
        factory: createColorValueDecision,
        models: [
            {
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
        factory: createColorLightnessScaleDecision,
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a lightness scale with arbitrary percentage values.',
            },
            {
                model: 'linear-range',
                name: 'Linear Range',
                description:
                    'Defines a lightness scale interpolating linearly between two lightness values.',
            },
            {
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
        type: 'color-scale',
        name: 'Color Scale',
        description: 'A decision to define a color scale.',
        factory: createColorScaleDecision,
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a color scale with arbitrary color values.',
            },
            {
                model: 'linear-range',
                name: 'Linear Range',
                description: 'Defines a gradient scale interpolating linearly between two colors.',
            },
            {
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a color scale by successively applying a modifier to the previous step.',
            },
        ],
    },
];
