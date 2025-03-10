import { describe, expect, it } from 'vitest';

import { type FontFamilyLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createFontFamilyValueExplicitModel } from './createFontFamilyValueExplicitModel';

describe('createFontFamilyValueExplicitModel()', () => {
    const model = createFontFamilyValueExplicitModel();
    const input = 'Foo, Bar, Baz Qux' as FontFamilyLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('Foo, Bar, "Baz Qux"');
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
