import { DECISION_SPACE_SCALE, DECISION_SPACE_VALUE } from '../../../constants';
import {
    MODEL_TYPE_ANCHORED,
    MODEL_TYPE_BOUNDED,
    MODEL_TYPE_EXPLICIT,
    createSpaceScaleAnchoredModel,
    createSpaceScaleBoundedModel,
    createSpaceScaleExplicitModel,
    createSpaceValueExplicitModel,
} from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const SpaceDecisionTypes: DecisionType[] = [
    {
        type: DECISION_SPACE_VALUE,
        name: 'Space Value',
        category: 'value',
        domain: 'space',
        description: 'A decision to define a space value.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a space value explicitly.',
                factory: castFactory(createSpaceValueExplicitModel),
            },
        ],
    },
    {
        type: DECISION_SPACE_SCALE,
        name: 'Space Scale',
        category: 'scale',
        domain: 'space',
        description: 'A decision to define a space scale.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a space scale with arbitrary space values.',
                factory: castFactory(createSpaceScaleExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description:
                    'Defines a space scale interpolating linearly between two space values.',
                factory: castFactory(createSpaceScaleBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a space scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createSpaceScaleAnchoredModel),
            },
        ],
    },
];
