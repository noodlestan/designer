import { createTypefaceValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const TypeDecisionTypes: DecisionType[] = [
    {
        type: 'typeface-value',
        name: 'Typeface Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a typeface.',
        models: [
            {
                model: 'explicit',
                name: 'Explicit value',
                description: 'Defines a typeface value explicitly.',
                factory: castFactory(createTypefaceValueExplicitModel),
            },
        ],
    },
];
