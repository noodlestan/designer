import { describe, expect, it } from 'vitest';

import type { SizeObjectLiteral } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSizeValueExplicitModel } from './createSizeValueExplicitModel';

describe('createSizeValueExplicitModel()', () => {
    const model = createSizeValueExplicitModel();
    const input = {
        value: 33.333,
        unit: 'rem',
    } as SizeObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockValueContext] = createValueContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toString()).toEqual('33.33rem');
        });
    });

    describe('Given a quantize param', () => {
        const [mockValueContext] = createValueContextMock({ params: { ...params, quantize: 5 } });

        it('should create a quantized value', () => {
            const result = model.produce(mockValueContext);

            expect(result.get().toString()).toEqual('35rem');
        });
    });
});
