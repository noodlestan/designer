import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabChromaScaleBoundedInput } from '../../../types';

import { createColorOklabChromaScaleBoundedModel } from './createColorOklabChromaScaleBoundedModel';

describe('createColorOklabChromaScaleBoundedModel()', () => {
    const model = createColorOklabChromaScaleBoundedModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 7;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.11,
            to: 0.99,
            steps: expectedLength - 2,
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(params.from);
            expect(result.get().item(4)?.get()).toEqual(0.37);
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.1347,
            to: 0.99,
            steps: 1,
            quantize: 0.2,
        };

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.134);
            expect(result.get().item(1)?.get()).toEqual(0.318);
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });
});
