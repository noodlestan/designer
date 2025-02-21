import { describe, expect, it } from 'vitest';

import { TypefaceValueExplicitInput, TypefaceValueInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createTypefaceValueExplicitModel } from './createTypefaceValueExplicitModel';

describe('createTypefaceValueExplicitModel()', () => {
    const model = createTypefaceValueExplicitModel();
    const input = {
        fontName: 'Foo',
        capabilities: [],
        source: { type: 'import', value: '@foo/bar/style.css' },
        styles: [],
    } as TypefaceValueInput;

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: TypefaceValueExplicitInput['params'] = input;

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.toString()).toEqual(params.fontName);
        });
    });
});
