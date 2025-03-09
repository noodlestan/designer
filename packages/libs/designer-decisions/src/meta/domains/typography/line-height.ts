import { DECISION_LINE_HEIGHT_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createLineHeightValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const LineHeightDecisionTypes: DecisionType[] = [
    {
        type: DECISION_LINE_HEIGHT_VALUE,
        name: 'Line Height Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a line height.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a line height value explicitly.',
                factory: castFactory(createLineHeightValueExplicitModel),
            },
        ],
    },
];
