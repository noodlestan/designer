import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabChromaScaleBoundedModel } from './createColorOklabChromaScaleBoundedModel';

describe('createColorOklabChromaScaleBoundedModel()', () => {
    const model = createColorOklabChromaScaleBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 7;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.11,
            to: 0.99,
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

            expect(result.get().first()?.get().toNumber()).toEqual(0.11);
            expect(result.get().item(4)?.get().toNumber()).toEqual(0.37);
            expect(result.get().last()?.get().toNumber()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.1347,
            to: 0.99,
            steps: 1,
            quantize: 0.2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(0.134);
            expect(result.get().item(1)?.get().toNumber()).toEqual(0.318);
            expect(result.get().last()?.get().toNumber()).toEqual(0.5);
        });
    });
});
