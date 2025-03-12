import { D_TYPEFACE_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createTypefaceValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const TypefaceDecisionTypes: DecisionType[] = [
    {
        type: D_TYPEFACE_VALUE,
        name: 'Typeface Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a typeface.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a typeface value explicitly.',
                factory: castFactory(createTypefaceValueExplicitModel),
            },
        ],
    },
];
