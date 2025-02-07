import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabLightnessValueExplicitInput } from '../../../types';

import { createColorOklabLightnessValueExplicitModel } from './createColorOklabLightnessValueExplicitModel';

describe('createColorOklabLightnessValueExplicitModel()', () => {
    const model = createColorOklabLightnessValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabLightnessValueExplicitInput['params'] = {
            value: 0.511,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(params.value);
        });
    });

    describe('Given input out of range', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabLightnessValueExplicitInput['params'] = {
            value: 2,
        };

        it('should create a clamped value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabLightnessValueExplicitInput['params'] = {
            value: 0.31,
            quantize: 0.2,
        };

        it('should create a rounded value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(0.4);
        });
    });
});
