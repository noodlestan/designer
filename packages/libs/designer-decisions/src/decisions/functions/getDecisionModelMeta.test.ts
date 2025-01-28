import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MOCK_DECISION_TYPES } from '../../mocks';
import type { DecisionType, DecisionTypeModel } from '../../types';

import { getDecisionModelMeta } from './getDecisionModelMeta';

vi.mock('../../meta', () => {
    return {
        DECISION_TYPES: MOCK_DECISION_TYPES,
    };
});

describe('getDecisionModelMeta()', () => {
    describe('Given a valid model name', () => {
        const model = 'type/model-name';

        let result: [DecisionType, DecisionTypeModel];

        beforeEach(() => {
            result = getDecisionModelMeta(model);
        });

        it('should return the matching decision type', () => {
            const [decisionType] = result;

            expect(decisionType).toBe(MOCK_DECISION_TYPES[0]);
        });

        it('should return the matching decision model', () => {
            const [, decisionModel] = result;

            expect(decisionModel.model).toBe(model);
            expect(decisionModel.name).toBe(MOCK_DECISION_TYPES[0].models[0].name);
            expect(decisionModel.description).toBe(MOCK_DECISION_TYPES[0].models[0].description);
            expect(decisionModel.factory).toBe(MOCK_DECISION_TYPES[0].models[0].factory);
        });
    });

    describe('Given an invalid model name', () => {
        const invalidModel = 'nonexistent-type/nonexistent-model';

        it('should throw a "Unknown decision" error', () => {
            expect(() => getDecisionModelMeta(invalidModel)).toThrowError(
                `Unknow decision type "${invalidModel}".`,
            );
        });
    });
});
