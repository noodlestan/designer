import { DECISION_FONT_SIZE_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createFontSizeValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const FontSizeDecisionTypes: DecisionType[] = [
    {
        type: DECISION_FONT_SIZE_VALUE,
        name: 'Font Size Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a font size.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a font size value explicitly.',
                factory: castFactory(createFontSizeValueExplicitModel),
            },
        ],
    },
];
