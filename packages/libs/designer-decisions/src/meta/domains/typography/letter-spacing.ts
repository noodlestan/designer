import { D_LETTER_SPACING_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createLetterSpacingValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const LetterSpacingDecisionTypes: DecisionType[] = [
    {
        type: D_LETTER_SPACING_VALUE,
        name: 'Letter Spacing Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a letter spacing.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a letter spacing value explicitly.',
                factory: castFactory(createLetterSpacingValueExplicitModel),
            },
        ],
    },
];
