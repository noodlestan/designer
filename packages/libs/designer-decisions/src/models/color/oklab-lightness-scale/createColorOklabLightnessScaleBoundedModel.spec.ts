import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabLightnessScaleBoundedModel } from './createColorOklabLightnessScaleBoundedModel';

describe('createColorOklabLightnessScaleBoundedModel()', () => {
    const model = createColorOklabLightnessScaleBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 3;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.5,
            to: 1.5,
            steps: expectedLength - 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(params.from);
            expect(result.item(1)?.toNumber()).toEqual(0.75);
            expect(result.last()?.toNumber()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.5357,
            to: 1.5,
            steps: 1,
            quantize: 0.2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(0.536);
            expect(result.item(1)?.toNumber()).toEqual(0.768);
            expect(result.last()?.toNumber()).toEqual(1);
        });
    });
});
