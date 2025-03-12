import { D_SIZE_SCALE, D_SIZE_VALUE } from '../../../constants';
import {
    MODEL_TYPE_ANCHORED,
    MODEL_TYPE_BOUNDED,
    MODEL_TYPE_EXPLICIT,
    createSizeScaleAnchoredModel,
    createSizeScaleBoundedModel,
    createSizeScaleExplicitModel,
    createSizeValueExplicitModel,
} from '../../../models';
import { castFactory } from '../../functions';
import type { DecisionType } from '../../types';

export const SizeDecisionTypes: DecisionType[] = [
    {
        type: D_SIZE_VALUE,
        name: 'Size Value',
        category: 'value',
        domain: 'space',
        description: 'A decision to define a size value.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a size value explicitly.',
                factory: castFactory(createSizeValueExplicitModel),
            },
        ],
    },
    {
        type: D_SIZE_SCALE,
        name: 'Size Scale',
        category: 'set',
        domain: 'space',
        description: 'A decision to define a size scale.',
        models: [
            {
                model: MODEL_TYPE_EXPLICIT,
                name: 'Explicit value',
                description: 'Defines a size scale with arbitrary size values.',
                factory: castFactory(createSizeScaleExplicitModel),
            },
            {
                model: MODEL_TYPE_BOUNDED,
                name: 'Bounded',
                description: 'Defines a size scale interpolating linearly between two size values.',
                factory: castFactory(createSizeScaleBoundedModel),
            },
            {
                model: MODEL_TYPE_ANCHORED,
                name: 'Anchored',
                description:
                    'Defines a size scale from an anchor value applying modifiers to generate items before and/or after the anchor .',
                factory: castFactory(createSizeScaleAnchoredModel),
            },
        ],
    },
];
