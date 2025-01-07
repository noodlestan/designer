import {
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
} from '../../models';
import type { DecisionType } from '../../types';
import { castFactory } from '../functions';

export const ColorOklabDecisionTypes: DecisionType[] = [
    {
        type: 'color-oklab-hue-value',
        name: 'Oklab Hue Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the hue of a Oklab color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description:
                    'Defines the hue of a Oklab color as degrees on the Oklab color wheel.',
                factory: castFactory(createColorOklabHueValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-oklab-hue-set',
        name: 'Oklab Hue Set',
        category: 'set',
        domain: 'color',
        description: 'A decision to define the hue set for Oklab colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a Oklab hue set with arbitrary degrees.',
                factory: castFactory(createColorOklabHueSetExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a Oklab hue set interpolating linearly between two hue values.',
                factory: castFactory(createColorOklabHueSetBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a Oklab hue set from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorOklabHueSetAnchoredModel),
            },
        ],
    },
    {
        type: 'color-oklab-chroma-value',
        name: 'Oklab Chroma Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the chroma of a Oklab color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description:
                    'Defines the chroma of a Oklab color as a number, where 0.4 is equivalent to 100%.',
                factory: castFactory(createColorOklabChromaValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-oklab-chroma-scale',
        name: 'Oklab Chroma Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a chroma scale for Oklab colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a Oklab chroma scale with arbitrary percentage values.',
                factory: castFactory(createColorOklabChromaScaleExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a Oklab chroma scale interpolating linearly between two chroma values.',
                factory: castFactory(createColorOklabChromaScaleBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a Oklab chroma scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorOklabChromaScaleAnchoredModel),
            },
        ],
    },
    {
        type: 'color-oklab-lightness-value',
        name: 'Oklab Lightness Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define the lightness of a Oklab color.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines the lightness of a Oklab color as a percentage.',
                factory: castFactory(createColorOklabLightnessValueExplicitModel),
            },
        ],
    },
    {
        type: 'color-oklab-lightness-scale',
        name: 'Oklab Lightness Scale',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a lightness scale for Oklab colors.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a Oklab lightness scale with arbitrary percentage values.',
                factory: castFactory(createColorOklabLightnessScaleExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a Oklab lightness scale interpolating linearly between two lightness values.',
                factory: castFactory(createColorOklabLightnessScaleBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a Oklab lightness scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorOklabLightnessScaleAnchoredModel),
            },
        ],
    },
];
