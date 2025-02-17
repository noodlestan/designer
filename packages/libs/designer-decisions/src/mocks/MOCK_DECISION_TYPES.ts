import { vi } from 'vitest';

import type { DecisionType, DecisionTypeModel } from '../meta';

const mockModelMeta: DecisionTypeModel = {
    model: 'model-name',
    name: 'Model name',
    description: 'Model description',
    factory: vi.fn(),
};

const mockDecisionType: DecisionType = {
    type: 'type',
    name: 'Decision Type',
    category: 'category',
    domain: 'domain',
    description: 'Mock decision type for testing purposes.',
    models: [mockModelMeta],
};

export const MOCK_DECISION_TYPES: DecisionType[] = [mockDecisionType];
