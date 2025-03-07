import { describe, expect, it } from 'vitest';

const { getDecisionModelMeta } = await import('./getDecisionModelMeta');

describe('getDecisionModelMeta()', () => {
    describe('Given a valid model name', () => {
        const model = 'size-value/explicit';

        it('should return the matching decision type', () => {
            const [decisionType] = getDecisionModelMeta(model);

            expect(decisionType.type).toBe('size-value');
        });

        it('should return the matching decision model', () => {
            const [, decisionModel] = getDecisionModelMeta(model);

            expect(decisionModel.model).toBe('size-value/explicit');
            expect(decisionModel.name).toBe('Explicit value');
        });
    });

    describe('Given an invalid model name', () => {
        const invalidModel = 'nonexistent-type/nonexistent-model';

        it('should throw a "Unknown Decision Model" error', () => {
            expect(() => getDecisionModelMeta(invalidModel)).toThrowError(
                `Unknown Decision Model "${invalidModel}".`,
            );
        });
    });
});
