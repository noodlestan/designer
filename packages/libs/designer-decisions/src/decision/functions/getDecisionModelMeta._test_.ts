import { describe, expect, it } from 'vitest';

import { getDecisionModelMeta } from './getDecisionModelMeta';

describe.skip('getDecisionModelMeta()', () => {
    describe('Given a valid model name', () => {
        const model = 'color-oklab-hue-value/explicit';

        it('should return the matching decision type', () => {
            const [decisionType] = getDecisionModelMeta(model);

            expect(decisionType.type).toBe('color-oklab-hue-value');
        });

        it('should return the matching decision model', () => {
            const [, decisionModel] = getDecisionModelMeta(model);

            expect(decisionModel.model).toBe('color-oklab-hue-value/explicit');
            expect(decisionModel.name).toBe('Explicit value');
        });
    });

    describe('Given an invalid model name', () => {
        const invalidModel = 'nonexistent-type/nonexistent-model';

        it('should throw a "Unknown decision model" error', () => {
            expect(() => getDecisionModelMeta(invalidModel)).toThrowError(
                `Unknown decision model "${invalidModel}".`,
            );
        });
    });
});
