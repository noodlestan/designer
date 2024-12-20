import {
    createSpaceScaleExplicit,
    createSpaceScaleLinearRange,
    createSpaceScaleModifier,
} from '../decision/types/space/space-scale';
import { createSpaceValueExplicit } from '../decision/types/space/space-value';
import type { DecisionTypeMeta } from '../types';

import { castFactory } from './functions';

export const SpaceDecisionTypes: DecisionTypeMeta[] = [
    {
        category: 'value',
        domain: 'space',
        type: 'space-value',
        name: 'Space Value',
        description: 'A decision to define a space value.',
        models: [
            {
                factory: castFactory(createSpaceValueExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a space value.',
            },
        ],
    },
    {
        category: 'scale',
        domain: 'space',
        type: 'space-scale',
        name: 'Space Scale',
        description: 'A decision to define a space scale.',
        models: [
            {
                factory: castFactory(createSpaceScaleExplicit),
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a space scale with arbitrary space values.',
            },
            {
                factory: castFactory(createSpaceScaleLinearRange),
                model: 'linear-range',
                name: 'Linear Range',
                description:
                    'Defines a space scale interpolating linearly between two space values.',
            },
            {
                factory: castFactory(createSpaceScaleModifier),
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a space scale by successively applying a modifier to the previous step.',
            },
        ],
    },
];
