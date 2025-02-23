import { describe, expect, it } from 'vitest';

import type { SizeValueExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSizeValueExplicitModel } from './createSizeValueExplicitModel';

describe('createSizeValueExplicitModel()', () => {
    const model = createSizeValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: SizeValueExplicitInput['params'] = {
            value: 2.111,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.toString()).toEqual('2.1px');
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: SizeValueExplicitInput['params'] = {
            value: 2.111,
            quantize: 4,
        };

        it('should create a quantized value', () => {
            const result = model.produce(mockContext, params);

            expect(result.toString()).toEqual('4px');
        });
    });
});
