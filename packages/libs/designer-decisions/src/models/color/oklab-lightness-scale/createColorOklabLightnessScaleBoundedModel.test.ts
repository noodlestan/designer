import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabChromaScaleBoundedInput } from '../../../types';

import { createColorOklabLightnessScaleBoundedModel } from './createColorOklabLightnessScaleBoundedModel';

describe('createColorOklabLightnessScaleBoundedModel()', () => {
    const model = createColorOklabLightnessScaleBoundedModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 3;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.5,
            to: 1.5,
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
            expect(result.get().item(1)?.get()).toEqual(0.75);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });

    describe('Given a precision', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 0.5,
            to: 1.5,
            steps: 1,
            precision: 0.2,
        };

        it('should round the values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.6);
            expect(result.get().item(1)?.get()).toEqual(0.8);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
