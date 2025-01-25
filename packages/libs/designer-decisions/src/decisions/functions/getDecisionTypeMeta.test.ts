import { describe, expect, it, vi } from 'vitest';

import { MOCK_DECISION_TYPES } from '../mocks';

import { getDecisionTypeMeta } from './getDecisionTypeMeta';

vi.mock('../../meta', () => {
    return {
        DECISION_TYPES: MOCK_DECISION_TYPES,
    };
});

describe('getDecisionTypeMeta()', () => {
    describe('Given a valid decision type', () => {
        const type = 'type';

        it('should return the matching decision type', () => {
            const result = getDecisionTypeMeta(type);

            expect(result).toBe(MOCK_DECISION_TYPES[0]);
        });
    });

    describe('Given an invalid decision type', () => {
        const invalidType = 'nonexistent-type';

        it('should throw an "Unknown decision" error', () => {
            expect(() => getDecisionTypeMeta(invalidType)).toThrowError(
                `Unknow decision type "${invalidType}".`,
            );
        });
    });
});
