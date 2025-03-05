import { describe, expect, it } from 'vitest';

import { type SizeObjectLiteral } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createFontSizeValueExplicitModel } from './createFontSizeValueExplicitModel';

describe('createFontSizeValueExplicitModel()', () => {
    const model = createFontSizeValueExplicitModel();
    const input = {
        value: 33.3311,
        unit: 'rem',
    } as SizeObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().literal()).toEqual(input);
        });
    });

    describe('Given a context and no params', () => {
        const [mockValueContext] = createValueContextMock();

        it('should create a fallback value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toString()).toEqual('16px');
        });
    });
});
