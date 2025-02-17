import { describe, expect, it } from 'vitest';

import { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSRGBHueSetBoundedModel } from './createColorSRGBHueSetBoundedModel';

describe('createColorSRGBHueSetBoundedModel()', () => {
    const model = createColorSRGBHueSetBoundedModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 3;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 350.725,
            to: 370,
            steps: expectedLength - 2,
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(350.7);
            expect(result.get().item(1)?.get()).toEqual(355.4);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 351.725,
            to: 370,
            steps: 1,
            quantize: 2,
        };

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(352);
            expect(result.get().item(1)?.get()).toEqual(356);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });
});
