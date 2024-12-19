import { createSpaceScaleDecision, createSpaceValueDecision } from '../decisions';
import type { DecisionTypeMeta } from '../types';

export const SpaceDecisionTypes: DecisionTypeMeta[] = [
    {
        category: 'value',
        domain: 'space',
        type: 'space-value',
        name: 'Space Value',
        description: 'A decision to define a space value.',
        factory: createSpaceValueDecision,
        models: [
            {
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
        factory: createSpaceScaleDecision,
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a space scale with arbitrary space values.',
            },
            {
                model: 'linear-range',
                name: 'Linear Range',
                description:
                    'Defines a space scale interpolating linearly between two space values.',
            },
            {
                model: 'modifier',
                name: 'Stepped Modifier',
                description:
                    'Defines a space scale by successively applying a modifier to the previous step.',
            },
        ],
    },
];
