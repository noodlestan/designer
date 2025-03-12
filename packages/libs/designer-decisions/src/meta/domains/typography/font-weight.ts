import { D_FONT_WEIGHT_VALUE } from '../../../constants';
import { MODEL_TYPE_EXPLICIT, createFontWeightValueExplicitModel } from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const FontWeightDecisionTypes: DecisionType[] = [
    {
        type: D_FONT_WEIGHT_VALUE,
        name: 'Font Weight Value',
        category: 'value',
        domain: 'typography',
        description: 'A decision to define a font weight.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a font weight value explicitly.',
                factory: castFactory(createFontWeightValueExplicitModel),
            },
        ],
    },
];
