import { describe, expect, it } from 'vitest';

import type { ColorSRGBLightnessValueExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorSRGBLightnessValueExplicitModel } from './createColorSRGBLightnessValueExplicitModel';

describe('createColorSRGBLightnessValueExplicitModel()', () => {
    const model = createColorSRGBLightnessValueExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorSRGBLightnessValueExplicitInput['params'] = {
            value: 0.555,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toNumber()).toEqual(params.value);
        });
    });

    describe('Given input out of range', () => {
        const params: ColorSRGBLightnessValueExplicitInput['params'] = {
            value: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a clamped value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toNumber()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorSRGBLightnessValueExplicitInput['params'] = {
            value: 0.3137,
            quantize: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a quantized value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toNumber()).toEqual(0.32);
        });
    });
});
