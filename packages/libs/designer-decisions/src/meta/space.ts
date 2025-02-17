import {
    createSpaceScaleAnchoredModel,
    createSpaceScaleBoundedModel,
    createSpaceScaleExplicitModel,
    createSpaceValueExplicitModel,
} from '../models';

import { castFactory } from './functions';
import type { DecisionType } from './types';

export const SpaceDecisionTypes: DecisionType[] = [
    {
        type: 'space-value',
        name: 'Space Value',
        category: 'value',
        domain: 'space',
        description: 'A decision to define a space value.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a space value explicitly.',
                factory: castFactory(createSpaceValueExplicitModel),
            },
        ],
    },
    {
        type: 'space-scale',
        name: 'Space Scale',
        category: 'scale',
        domain: 'space',
        description: 'A decision to define a space scale.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a space scale with arbitrary space values.',
                factory: castFactory(createSpaceScaleExplicitModel),
            },
            {
                model: 'bounded',
                name: 'Bounded',
                description:
                    'Defines a space scale interpolating linearly between two space values.',
                factory: castFactory(createSpaceScaleBoundedModel),
            },
            {
                model: 'anchored',
                name: 'Anchored',
                description:
                    'Defines a space scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createSpaceScaleAnchoredModel),
            },
        ],
    },
];
