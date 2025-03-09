import { describe, expect, it } from 'vitest';

import { type LineHeightObjectLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createLineHeightValueExplicitModel } from './createLineHeightValueExplicitModel';

describe('createLineHeightValueExplicitModel()', () => {
    const model = createLineHeightValueExplicitModel();
    const input = {
        value: 100,
    } as LineHeightObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('100');
        });
    });

    describe('Given a context and no params', () => {
        const [mockModelContext] = createModelContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockModelContext);

            expect(result.literal()).toEqual({ value: 1, unit: undefined });
        });
    });
});
