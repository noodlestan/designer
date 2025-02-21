import { describe, expect, it } from 'vitest';

import { TypefaceValueAttributesInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createTypefaceValueExplicitModel } from './createTypefaceValueExplicitModel';

describe('createTypefaceValueExplicitModel()', () => {
    const model = createTypefaceValueExplicitModel();
    const input = {
        fontName: 'Foo',
        capabilities: [],
        source: { type: 'import', value: '@foo/bar/style.css' },
        styles: [],
    } as TypefaceValueAttributesInput;

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();

        it('should create a value', () => {
            const result = model.produce(mockContext, input);

            expect(result.get().toString()).toEqual(input.fontName);
        });
    });
});
