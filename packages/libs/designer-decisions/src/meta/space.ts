import {
    createSpaceScaleExplicit,
    createSpaceScaleLinearRange,
    createSpaceScaleModifier,
    createSpaceValueExplicit,
} from '../decision';
import type { DecisionType } from '../types';

import { castFactory } from './functions';

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
                description: 'Defines a space value.',
                factory: castFactory(createSpaceValueExplicit),
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
                factory: castFactory(createSpaceScaleExplicit),
            },
            {
                model: 'linear-range',
                name: 'Linear Range',
                description:
                    'Defines a space scale interpolating linearly between two space values.',
                factory: castFactory(createSpaceScaleLinearRange),
            },
            {
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a space scale by successively applying a modifier to the previous step.',
                factory: castFactory(createSpaceScaleModifier),
            },
        ],
    },
];
