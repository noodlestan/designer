import { DECISION_FONT_FAMILY_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createFontFamilyValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const FontFamilyDecisionTypes: DecisionType[] = [
    {
        type: DECISION_FONT_FAMILY_VALUE,
        name: 'Font Family Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a font-family attribute.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a font-family attribute explicitly.',
                factory: castFactory(createFontFamilyValueExplicitModel),
            },
        ],
    },
];
