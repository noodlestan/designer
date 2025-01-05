import {
    createColorSetAnchoredModel,
    createColorSetBoundedModel,
    createColorSetExplicitModel,
} from '../../models';
import type { DecisionType } from '../../types';
import { castFactory } from '../functions';

export const ColorSetDecisionTypes: DecisionType[] = [
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
