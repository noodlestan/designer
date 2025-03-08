import { describe, expect, it } from 'vitest';

import { type SizeObjectLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createFontSizeValueExplicitModel } from './createFontSizeValueExplicitModel';

describe('createFontSizeValueExplicitModel()', () => {
    const model = createFontSizeValueExplicitModel();
    const input = {
        value: 33.3311,
        unit: 'rem',
    } as SizeObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.literal()).toEqual(input);
        });
    });

    describe('Given a context and no params', () => {
        const [mockModelContext] = createModelContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('16px');
        });
    });
});
