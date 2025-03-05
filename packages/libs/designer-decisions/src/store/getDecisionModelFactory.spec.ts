import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { DecisionType } from '../meta';
import type { DecisionModelFactory } from '../models';

import { getDecisionModelFactory } from './getDecisionModelFactory';
import { getDecisionModelMeta } from './private';

vi.mock('./private', () => ({
    getDecisionModelMeta: vi.fn(),
}));

const getDecisionModelMetaMocked = vi.mocked(getDecisionModelMeta);

describe('getDecisionModelFactory()', () => {
    const mockFactory = vi.fn() as DecisionModelFactory;
    const mockModelMeta = {
        model: 'model-name',
        name: 'Model name',
        description: 'Model description',
        factory: mockFactory,
    };

    const mockDecisionType: DecisionType = {
        type: 'type',
        name: 'Decision Type',
        category: 'category',
        domain: 'domain',
        description: 'This is a mock decision type for testing purposes.',
        models: [mockModelMeta],
    };

    beforeEach(() => {
        vi.resetAllMocks();
        getDecisionModelMetaMocked.mockReturnValue([mockDecisionType, mockModelMeta]);
    });

    describe('Given a model name', () => {
        const modelName = 'model-name';

        it('should call getDecisionModelMeta with the model name', () => {
            getDecisionModelFactory(modelName);
            expect(getDecisionModelMetaMocked).toHaveBeenCalledWith(modelName);
        });

        it('should return the factory function for the specified model', () => {
            const result = getDecisionModelFactory(modelName);
            expect(result).toBe(mockFactory);
        });
    });
});
