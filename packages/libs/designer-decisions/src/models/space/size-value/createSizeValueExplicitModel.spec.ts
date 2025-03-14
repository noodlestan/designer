import { describe, expect, it } from 'vitest';

import type { SizeObjectLiteral } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createSizeValueExplicitModel } from './createSizeValueExplicitModel';

describe('createSizeValueExplicitModel()', () => {
    const model = createSizeValueExplicitModel();
    const input = {
        value: 33.333,
        unit: 'rem',
    } as SizeObjectLiteral;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('33.33rem');
        });
    });

    describe('Given a quantize param', () => {
        const [mockModelContext] = createModelContextMock({ params: { ...params, quantize: 5 } });

        it('should create a quantized value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString()).toEqual('35rem');
        });
    });
});
