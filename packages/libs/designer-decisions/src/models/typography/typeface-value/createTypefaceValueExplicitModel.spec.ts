import { describe, expect, it } from 'vitest';

import { type TypefaceObjectLiteral } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createTypefaceValueExplicitModel } from './createTypefaceValueExplicitModel';

describe('createTypefaceValueExplicitModel()', () => {
    const model = createTypefaceValueExplicitModel();
    const input = {
        fontName: 'Foo',
        capabilities: ['variable'],
        source: { type: 'import', value: '@foo/bar/style.css' },
    } as TypefaceObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toString()).toEqual(input.fontName);
            expect(result.get().capabilities).toEqual(input.capabilities);
            expect(result.get().source).toEqual(input.source);
            expect(result.get().ranges).toEqual([]);
            expect(result.get().styles).toEqual([]);
        });
    });

    describe('Given a context and no params', () => {
        const [mockValueContext] = createValueContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toString()).toEqual('serif');
        });
    });
});
