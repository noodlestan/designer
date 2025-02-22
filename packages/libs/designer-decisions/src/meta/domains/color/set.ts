import { DECISION_COLOR_SET } from '../../../constants';
import {
    MODEL_TYPE_ANCHORED,
    MODEL_TYPE_BOUNDED,
    MODEL_TYPE_EXPLICIT,
    createColorSetAnchoredModel,
    createColorSetBoundedModel,
    createColorSetExplicitModel,
} from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const ColorSetDecisionTypes: DecisionType[] = [
    {
        type: DECISION_COLOR_SET,
        name: 'Color Set',
        category: 'scale',
        domain: 'color',
        description: 'A decision to define a color set.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a color set with arbitrary color values.',
                factory: castFactory(createColorSetExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description: 'Defines a gradient set interpolating linearly between two colors.',
                factory: castFactory(createColorSetBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a color set from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createColorSetAnchoredModel),
            },
        ],
    },
];
