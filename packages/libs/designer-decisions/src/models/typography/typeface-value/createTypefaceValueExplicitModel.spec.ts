import { describe, expect, it } from 'vitest';

import { type TypefaceObjectLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

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
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual(input.fontName);
            expect(result.capabilities).toEqual(input.capabilities);
            expect(result.source).toEqual(input.source);
            expect(result.ranges).toEqual([]);
            expect(result.styles).toEqual([]);
        });
    });

    describe('Given a context and no params', () => {
        const [mockModelContext] = createModelContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('serif');
        });
    });
});
