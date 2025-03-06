import { describe, expect, it } from 'vitest';

import { type FontWeightObjectLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createFontWeightValueExplicitModel } from './createFontWeightValueExplicitModel';

describe('createFontWeightValueExplicitModel()', () => {
    const model = createFontWeightValueExplicitModel();
    const input = {
        value: 100,
    } as FontWeightObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toString()).toEqual('100');
        });
    });

    describe('Given a context and no params', () => {
        const [mockModelContext] = createModelContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().literal()).toEqual({ value: 400, name: 'Normal' });
        });
    });
});
