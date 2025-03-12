import { describe, expect, it } from 'vitest';

import { type TextStyleObjectInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createTextStyleValueExplicitModel } from './createTextStyleValueExplicitModel';

describe('createTextStyleValueExplicitModel()', () => {
    const model = createTextStyleValueExplicitModel();
    const input = {
        fontFamily: 'Georgia',
        fontSize: '24px',
        fontWeight: 300,
    } as TextStyleObjectInput;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('Georgia / Light / 24px');
        });
    });

    describe('Given a context and no params', () => {
        const [mockModelContext] = createModelContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('');
        });
    });
});
