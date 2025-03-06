import { describe, expect, it } from 'vitest';

import type { ColorOklabLightnessValueExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabLightnessValueExplicitModel } from './createColorOklabLightnessValueExplicitModel';

describe('createColorOklabLightnessValueExplicitModel()', () => {
    const model = createColorOklabLightnessValueExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorOklabLightnessValueExplicitInput['params'] = {
            value: 0.511,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toNumber()).toEqual(params.value);
        });
    });

    describe('Given input out of range', () => {
        const params: ColorOklabLightnessValueExplicitInput['params'] = {
            value: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a clamped value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toNumber()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabLightnessValueExplicitInput['params'] = {
            value: 0.3137,
            quantize: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a quantized value', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().toNumber()).toEqual(0.32);
        });
    });
});
