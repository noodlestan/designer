import { describe, expect, it } from 'vitest';

import type { ColorSRGBLightnessScaleBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorSRGBLightnessScaleBoundedModel } from './createColorSRGBLightnessScaleBoundedModel';

describe('createColorSRGBLightnessScaleBoundedModel()', () => {
    const model = createColorSRGBLightnessScaleBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 3;
        const params: ColorSRGBLightnessScaleBoundedInput['params'] = {
            from: 0.5,
            to: 1.5,
            steps: expectedLength - 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(params.from);
            expect(result.get().item(1)?.get().toNumber()).toEqual(0.75);
            expect(result.get().last()?.get().toNumber()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorSRGBLightnessScaleBoundedInput['params'] = {
            from: 0.5357,
            to: 1.5,
            steps: 1,
            quantize: 0.2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(0.536);
            expect(result.get().item(1)?.get().toNumber()).toEqual(0.768);
            expect(result.get().last()?.get().toNumber()).toEqual(1);
        });
    });
});
