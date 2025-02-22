import { describe, expect, it } from 'vitest';

import { getDecisionTypeMeta } from './getDecisionTypeMeta';

describe('getDecisionTypeMeta()', () => {
    describe('Given a valid decision type', () => {
        const type = 'color-oklab-hue-value';

        it('should return the matching decision type', () => {
            const result = getDecisionTypeMeta(type);

            expect(result.type).toBe('color-oklab-hue-value');
            expect(result.category).toBe('color');
            expect(result.name).toBe('Oklab Hue Value');
        });
    });

    describe('Given an invalid decision type', () => {
        const invalidType = 'nonexistent-type';

        it('should throw an "Unknown decision type" error', () => {
            expect(() => getDecisionTypeMeta(invalidType)).toThrowError(
                `Unknown decision type "${invalidType}".`,
            );
        });
    });
});
