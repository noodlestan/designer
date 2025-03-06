import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabHueSetBoundedModel } from './createColorOklabHueSetBoundedModel';

describe('createColorOklabHueSetBoundedModel()', () => {
    const model = createColorOklabHueSetBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 3;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 350.725,
            to: 370,
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

            expect(result.get().first()?.get().toNumber()).toEqual(350.7);
            expect(result.get().item(1)?.get().toNumber()).toEqual(355.4);
            expect(result.get().last()?.get().toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 351.725,
            to: 370,
            steps: 1,
            quantize: 2.5,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(352.5);
            expect(result.get().item(1)?.get().toNumber()).toEqual(357.5);
            expect(result.get().last()?.get().toNumber()).toEqual(360);
        });
    });
});
