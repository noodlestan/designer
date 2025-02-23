import { describe, expect, it } from 'vitest';

import { decisionTypeFromModel } from './decisionTypeFromModel';

describe('decisionTypeFromModel()', () => {
    describe('Given a valid model name', () => {
        const model = 'type/model-name';

        it('should return the matching decision type', () => {
            const decisionType = decisionTypeFromModel(model);

            expect(decisionType).toBe('type');
        });
    });

    describe('Given an invalid model name', () => {
        const invalidModel = '';

        it('should return unknown', () => {
            const decisionType = decisionTypeFromModel(invalidModel);

            expect(decisionType).toBe('unknown');
        });
    });
});
