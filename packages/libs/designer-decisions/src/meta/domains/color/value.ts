import { MODEL_TYPE_EXPLICIT, createColorValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const ColorValueDecisionTypes: DecisionType[] = [
    {
        type: 'color-value',
        name: 'Color Value',
        category: 'value',
        domain: 'color',
        description: 'A decision to define a color value.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a color value explicitly.',
                factory: castFactory(createColorValueExplicitModel),
            },
        ],
    },
];
