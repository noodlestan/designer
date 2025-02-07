import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabHueValueExplicitInput } from '../../../types';

import { createColorOklabHueValueExplicitModel } from './createColorOklabHueValueExplicitModel';

describe('createColorOklabHueValueExplicitModel()', () => {
    const model = createColorOklabHueValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabHueValueExplicitInput['params'] = {
            value: 330.111,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(params.value);
        });
    });

    describe('Given input out of range', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabHueValueExplicitInput['params'] = {
            value: 390,
        };

        it('should create a clamped value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabHueValueExplicitInput['params'] = {
            value: 333.111,
            quantize: 0.2,
        };

        it('should create a quantized value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(333.2);
        });
    });
});
