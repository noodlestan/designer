import { DECISION_TEXT_STYLE_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createTextStyleValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const TextStyleDecisionTypes: DecisionType[] = [
    {
        type: DECISION_TEXT_STYLE_VALUE,
        name: 'Text Style Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a text style.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a text style value explicitly.',
                factory: castFactory(createTextStyleValueExplicitModel),
            },
        ],
    },
];
